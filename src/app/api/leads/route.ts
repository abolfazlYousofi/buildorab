import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, website, message } = body;

    // اعتبارسنجی
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // ذخیره در دیتابیس
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        company: company || null,
        website: website || null,
        message: message || null,
        source: "website",
        ip: req.headers.get("x-forwarded-for") || null,
        userAgent: req.headers.get("user-agent") || null,
      },
    });

    // ارسال ایمیل اطلاع‌رسانی (اختیاری)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Buildorab" <${process.env.EMAIL_USER}>`,
          to: "abolfazlyousufi83@gmail.com",
          subject: `New Lead: ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "—"}</p>
            <p><strong>Website:</strong> ${website || "—"}</p>
            <p><strong>Message:</strong></p>
            <p>${message || "—"}</p>
            <hr />
            <p><small>Lead ID: ${lead.id}</small></p>
          `,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // ایمیل خطا نباید کل درخواست را fail کند
      }
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}