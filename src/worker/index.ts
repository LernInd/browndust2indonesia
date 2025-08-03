import { Hono } from "hono";
import { Buffer } from "node:buffer";

// Definisikan tipe untuk environment bindings, termasuk secrets
type Bindings = {
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
};

// Definisikan tipe untuk respons dari Cloudinary API
interface CloudinaryResponse {
  secure_url: string;
}

const app = new Hono<{ Bindings: Bindings }>();

// Endpoint untuk menangani unggahan
app.post("/api/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return c.json({ error: "File tidak ditemukan" }, 400);
    }

    const cloudName = c.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = c.env.CLOUDINARY_API_KEY;
    const apiSecret = c.env.CLOUDINARY_API_SECRET;

    // Persiapkan data untuk dikirim ke Cloudinary
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("api_key", apiKey);

    // Buat timestamp dan signature untuk otentikasi
    const timestamp = Math.round(new Date().getTime() / 1000).toString();
    uploadFormData.append("timestamp", timestamp);

    // Buat signature di backend
    const signatureString = `timestamp=${timestamp}${apiSecret}`;
    const signatureBuffer = await crypto.subtle.digest(
      "SHA-1",
      new TextEncoder().encode(signatureString),
    );
    const signature = Buffer.from(signatureBuffer).toString("hex");
    uploadFormData.append("signature", signature);

    // Kirim permintaan ke Cloudinary API
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: uploadFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary Error:", data);
      
      // PERBAIKAN: Membuat Response secara manual untuk menghindari masalah overload
      const errorPayload = JSON.stringify({ error: "Gagal mengunggah ke Cloudinary", details: data });
      return new Response(errorPayload, {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Beri tipe pada 'data' yang berhasil
    const successData = data as CloudinaryResponse;

    // Kirim kembali URL gambar yang aman ke frontend
    return c.json({ url: successData.secure_url });

  } catch (error) {
    console.error("Server Error:", error);
    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
});

// Endpoint default
app.get("/api/", (c) => c.json({ name: "Cloudflare + Cloudinary" }));

export default app;