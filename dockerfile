# -------------------------
# 1️⃣ Base Stage
# -------------------------
FROM node:20-alpine AS base  
# 👉 بنبدأ من نسخة خفيفة من Node.js مبنية على Alpine Linux (خفيفة جدًا وسريعة).
# بتكون الأساس اللي كل المراحل التانية هتتبني عليها.

# -------------------------
# 2️⃣ Dependencies Stage
# -------------------------
FROM base AS deps  
# 👉 بنعمل مرحلة منفصلة لتثبيت الـ dependencies علشان نقدر نستخدم الكاش بتاعها.
# لو مافيش تغييرات في package.json، دوكر مش هيعيد التثبيت من الأول.

WORKDIR /app  
# 👉 بنحدد مجلد العمل داخل الصورة، كل الأوامر بعد كده هتتنفذ جوه /app.

# Copy only what’s needed for npm install
COPY package*.json ./  
# 👉 بننسخ ملفات الـ package.json و package-lock.json بس.
# ده بيسمح إننا نعمل npm install بسرعة من غير نسخ باقي الملفات.

COPY prisma ./prisma  
# 👉 بننسخ فولدر prisma بدري علشان الـ postinstall بتاع Prisma يقدر يلاقي schema.prisma.
# لو ماعملناش كده، prisma generate هيفشل.

RUN npm install  
# 👉 بنثبت كل الـ dependencies اللي في package.json.
# وبيشغل أوتوماتيك postinstall (لو فيه prisma generate مثلًا).

# Copy the rest of the project
COPY . .  
# 👉 بعد ما خلصنا التثبيت، بننسخ باقي المشروع كله.
# كده عندنا نسخة كاملة فيها الكود + الـ node_modules.

# -------------------------
# 3️⃣ Builder Stage
# -------------------------
FROM base AS builder  
# 👉 بنبدأ مرحلة جديدة هدفها عمل build لتطبيق Next.js.

WORKDIR /app  
# 👉 نفس مجلد العمل.

COPY --from=deps /app/node_modules ./node_modules  
# 👉 بناخد الـ node_modules من مرحلة deps علشان نستخدمها في الـ build.
# بكده مش محتاجين نعيد npm install تاني.

COPY . .  

RUN npm run build  

# -------------------------
# 4️⃣ Production Dependencies
# -------------------------
# ⚠️ Note: You shouldn’t run `npm install` again here; it resets node_modules.
# Instead, copy only necessary files or install production deps before running.
# Better approach: combine with builder stage.


# -------------------------
# 5️⃣ Runner Stage
# -------------------------
FROM base AS runner  
# 👉 المرحلة الأخيرة: الصورة اللي هتشتغل فعلاً في السيرفر (production).

WORKDIR /app  

ENV NODE_ENV=production  
# 👉 بنعيّن المتغير ده علشان يخلّي Node.js و Next.js يشتغلوا في وضع الإنتاج (أداء أعلى).

# Copy production build output and config files
COPY --from=builder /app/.next ./.next  
# 👉 بننسخ ملفات الـ build اللي اتولدت من مرحلة الـ builder.
COPY --from=builder /app/public ./public  
COPY --from=builder /app/prisma ./prisma  
COPY --from=builder /app/next.config.ts ./  
COPY --from=builder /app/package*.json ./  

# Install only production dependencies
RUN npm install --omit=dev  
# 👉 بنثبت الـ dependencies اللي تخص الإنتاج بس (بدون devDependencies).
# ده بيخلي حجم الصورة أصغر وأسرع في التشغيل.

# Generate Prisma client (optional if already generated)
RUN npx prisma generate  
# 👉 بنعمل توليد للـ Prisma Client من schema.prisma (لو مش متولد قبل كده).
# ضروري علشان التطبيق يقدر يتواصل مع قاعدة البيانات.

# Expose port
EXPOSE 3000  
# 👉 بنفتح البورت 3000 اللي Next.js بيشتغل عليه.

ENV PORT=3000  
# 👉 بنضبط متغير البيئة PORT علشان Next.js يعرف البورت اللي هيشتغل عليه.

# Start Next.js in production mode
CMD ["npm", "start"]  
# 👉 الأمر اللي هيشغل السيرفر فعليًا.
# بيستخدم السكريبت "start" من package.json لتشغيل Next.js في production mode.
