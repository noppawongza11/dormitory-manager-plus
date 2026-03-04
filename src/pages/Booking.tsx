import Navbar from "@/components/Navbar";
import FloorPlan from "@/components/FloorPlan";

const Booking = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <h1 className="font-prompt text-3xl font-bold text-center text-foreground mb-2">จองหอพัก</h1>
        <p className="text-center text-muted-foreground mb-10">เลือกชั้นและห้องที่ต้องการ</p>
        <FloorPlan />
      </div>
    </div>
  );
};

export default Booking;
