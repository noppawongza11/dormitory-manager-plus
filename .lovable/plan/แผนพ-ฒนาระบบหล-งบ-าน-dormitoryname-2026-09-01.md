# แผนพัฒนาระบบหลังบ้าน DORMITORYNAME

## เป้าหมาย
เพิ่มระบบ Backend ที่เชื่อมต่อกับฐานข้อมูลจริง ให้ผู้ดูแลหอพักสามารถจัดการการจอง แจ้งปัญหา และประกาศข่าวสารได้ โดยผู้เช่าล็อกอินได้และเห็นประวัติของตัวเอง

## สิ่งที่ต้องสร้าง

### 1. ฐานข้อมูล (Lovable Cloud)
- `profiles` — ข้อมูลผู้ใช้ (เชื่อมกับ auth.users)
- `user_roles` — บทบาท admin/tenant (แยกตารางตาม security best practice)
- `rooms` — ข้อมูลห้องพัก (ชั้น หมายเลข สถานะ ราคา ขนาด)
- `bookings` — รายการจอง (ห้อง ผู้จอง สถานะ วันที่ ยอดเงิน)
- `reports` — รายการแจ้งปัญหา (ห้อง ประเภท รายละเอียด รูปภาพ สถานะ)
- `announcements` — ประกาศ/ข่าวสารจากผู้ดูแล
- `notifications` — แจ้งเตือนส่วนตัวของผู้ใช้

### 2. ระบบสิทธิ์ (RLS)
- ใช้ `app_role` enum + `user_roles` table
- ฟังก์ชัน `has_role()` แบบ security definer
- Admin เห็นและจัดการทุกข้อมูล
- ผู้เช่าเห็นเฉพาะข้อมูลของตัวเอง

### 3. ระบบ Login
- อัปเดตหน้า Login ให้ใช้ Lovable Cloud Auth (Email/Password + Google)
- แยก redirect หลัง Login: Admin → /admin/dashboard, ผู้เช่า → /dashboard
- สร้างหน้า Register สำหรับผู้เช่า

### 4. หน้า Admin Dashboard
- `/admin/dashboard` — สรุปยอด: จองใหม่ แจ้งปัญหา ห้องว่าง
- `/admin/bookings` — รายการจองทั้งหมด + กดอนุมัติ/ปฏิเสธ
- `/admin/reports` — รายการแจ้งปัญหาพร้อมรูปภาพ + เปลี่ยนสถานะ
- `/admin/announcements` — เขียน/ลบประกาศ
- `/admin/rooms` — จัดการห้องพัก (สถานะ ราคา)

### 5. หน้าผู้เช่า
- `/dashboard` — ประวัติการจองของตัวเอง + แจ้งปัญหาของตัวเอง

### 6. การจองห้องพัก
- แก้ไข FloorPlan ให้ดึงห้องจากฐานข้อมูลแทน mock data
- กดจองแล้วบันทึกลง `bookings` พร้อมสถานะ pending
- ส่ง Email แจ้งเตือนผู้ดูแล

### 7. การแจ้งปัญหา
- แก้ไขหน้า Report ให้บันทึกลง `reports` พร้อมรูปภาพ
- ส่ง Email แจ้งเตือนผู้ดูแล

### 8. ระบบประกาศ
- แก้ไขหน้า Notifications ให้ดึงจาก `announcements`
- Admin สามารถโพสต์ประกาศใหม่

### 9. Email แจ้งเตือน
- สร้าง Edge Function `send-notification-email`
- เรียกใช้เมื่อมีการจองใหม่/แจ้งปัญหาใหม่
- ใช้ Lovable Cloud email service (ไม่ต้องตั้งค่า SMTP)

## ลำดับการทำงาน
1. สร้างตารางฐานข้อมูล + RLS policies
2. ตั้งค่า Auth (Email/Password + Google)
3. สร้างระบบจัดการบทบาท (seed admin)
4. แก้ไขหน้า Login/Register
5. แก้ไข FloorPlan + ระบบจองให้บันทึกจริง
6. แก้ไขหน้า Report ให้บันทึกจริง
7. สร้าง Admin Dashboard
8. สร้างหน้าผู้เช่า Dashboard
9. แก้ไข Notifications ให้ดึงประกาศ
10. สร้าง Edge Function ส่ง Email
11. ทดสอบ end-to-end

## หมายเหตุ
- ใช้ Lovable Cloud ทั้งหมด ไม่ต้องตั้งค่า Supabase เอง
- ผู้ดูแลเริ่มต้นจะสร้างบัญชี Admin ผ่าน migration seed
- ผู้เช่าสมัครสมาชิกผ่านหน้า Register ได้เลย
