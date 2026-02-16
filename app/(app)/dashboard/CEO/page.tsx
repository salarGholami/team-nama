// app/(app)/dashboard/CEODashboard/page.tsx

export default function CEODashboard() {
  const now = new Date();

  const weekday = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "long",
  }).format(now);

  const day = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
  }).format(now);

  const month = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "long",
  }).format(now);

  const year = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
  }).format(now);

  // ترتیب دلخواه — اینجا هر مدلی بخواهی می‌چینی
  const customDate = `${weekday} - ${day} / ${month} / ${year}`;

  return (
    <div className="flex">
      <div className="w-full mx-2">
        {/* header */}
        <section className="bg-primary-800 rounded-4xl text-white">
          <div className="flex justify-between px-4 py-20">
            <div className="flex flex-col gap-2">
              <span className="font-bold md:text-xl lg:text-2xl">
                پنل مدیریت
              </span>
              <span className="text-xs md:text-sm lg:text-base">
                به داشبورد مدیریت سازمان خوش آمدید
              </span>
            </div>

            <div className="flex flex-col gap-2 text-right">
              <span className="font-bold md:text-xl lg:text-2xl">تاریخ</span>
              <span className="text-xs md:text-sm lg:text-base">
                {customDate}
              </span>
            </div>
          </div>
        </section>
        {/* title */}
        <section className="flex flex-col md:flex-row justify-between items-center my-8 gap-8">
          <div className="bg-blue-900 w-full rounded-md">1</div>
          <div className="bg-blue-800 w-full rounded-md">2</div>
          <div className="bg-blue-700 w-full rounded-md">3</div>
          <div className="bg-blue-600 w-full rounded-md">4</div>
        </section>

        {/* full view */}
        <div className=""></div>
      </div>
    </div>
  );
}
