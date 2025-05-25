# ระบบ Backend สำหรับโพสต์ (NestJS)

## คุณสมบัติ

- สร้าง/อ่าน/แก้ไข/ลบ (CRUD) โพสต์
- Filter โพสต์ตาม author
- JWT Authentication
- Swagger API Docs

---

## การติดตั้ง

1. **โคลนโปรเจกต์**

   ```bash
   git clone <repo-url>
   cd backend
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

---

## การรันเซิร์ฟเวอร์

- **โหมดพัฒนา (auto-reload)**
  ```bash
  npm run start:dev
  ```
- **โหมดปกติ**
  ```bash
  npm run start
  ```
- **โหมด production**
  ```bash
  npm run start:prod
  ```

---

## การทดสอบ

- **Unit test**
  ```bash
  npm run test
  ```
- **E2E test**
  ```bash
  npm run test:e2e
  ```
- **Coverage**
  ```bash
  npm run test:cov
  ```

---

## การใช้งาน API

### Auth

| Method | Endpoint       | คำอธิบาย                      |
| ------ | -------------- | ----------------------------- |
| POST   | `/auth/login`  | Login ด้วย username (รับ JWT) |
| POST   | `/auth/logout` | Logout (mock, ไม่มีผลกับ JWT) |

### Posts

| Method | Endpoint                  | คำอธิบาย                                  |
| ------ | ------------------------- | ----------------------------------------- |
| GET    | `/posts`                  | ดูโพสต์ทั้งหมด                            |
| GET    | `/posts/:id`              | ดูโพสต์ตาม id                             |
| POST   | `/posts`                  | สร้างโพสต์ใหม่ (ต้อง login)               |
| PUT    | `/posts/:id`              | แก้ไขโพสต์ (ต้อง login, เป็นเจ้าของโพสต์) |
| DELETE | `/posts/:id`              | ลบโพสต์ (ต้อง login, เป็นเจ้าของโพสต์)    |
| GET    | `/posts/author/:username` | ดูโพสต์ทั้งหมดของ author                  |

---

## หมายเหตุ

- ต้องตั้งค่า JWT ให้ถูกต้องในฝั่ง client ด้วย
- สามารถปรับแต่ง/ขยาย endpoint ได้ตามต้องการ
- สามารถดู Swagger API Docs ได้ที่ `/api` (ถ้ามีเปิดใช้งาน)

---
