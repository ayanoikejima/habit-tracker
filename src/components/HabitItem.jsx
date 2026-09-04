import { useState } from "react";
import Button from "./Button";
import {
  Flame,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Trash2,
} from "lucide-react";

const HabitItem = ({
  habit,
  onDelete,
  calculateStreak,
  calculateCompletionRate,
  getLast7Days,
  onToggleDate,
  getCalendarDays,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const [currentDate, setCurrentDate] = useState(new Date());

  const completionRate = calculateCompletionRate(habit.completedDates);

  const last7Days = getLast7Days();
  const calendarDays = getCalendarDays(currentDate);

  const today = new Date();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <li className="relative flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
      <div className="min-w-0 flex-1">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            {/* 習慣名 */}
            <span className="text-lg font-bold">{habit.name}</span>

            {/* 継続日数 */}
            <p className="mt-2 flex items-center gap-1 text-sm whitespace-nowrap text-orange-400">
              <Flame
                size={16}
                className="shrink-0 text-orange-400 fill-orange-400"
              />
              {calculateStreak(habit.completedDates)}日継続
            </p>
          </div>

          {/* 開閉ボタン */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "閉じる" : "開く"}
            className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-gray-600"
          >
            {/* {isOpen ? <ChevronDown size={35} /> : <ChevronRight size={35} />} */}

            <ChevronDown
              size={35}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
        </div>

        {isOpen && (
          <>
            {/* ここから折りたたむ */}
            <p className="mt-2 text-sm text-gray-400">
              達成率： {completionRate}%
            </p>

            <div className="h-2 w-full mt-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-cyan-500 transition-all duration-500"
                style={{
                  width: `${completionRate}%`,
                }}
              ></div>
            </div>

            <div className="mt-5 w-full overflow-hidden">
              <div className="flex w-full justify-between">
                {last7Days.map((date) => {
                  const isCompleted = habit.completedDates.includes(date);

                  const dateObject = new Date(date);
                  const dayOfWeek = weekDays[dateObject.getDay()];

                  const today = new Date().toISOString().split("T")[0];
                  const isToday = date === today;

                  return (
                    <div
                      key={date}
                      className="min-w-0 flex flex-col items-center px-2 py-1"
                    >
                      {/* 今日の目印 */}
                      <div className="mb-1 flex h-1.5 items-center justify-center">
                        {isToday && (
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
                        )}
                      </div>

                      {/* 曜日 */}
                      <p className="text-xs text-gray-400">{dayOfWeek}</p>

                      {/* 完了ボタン */}
                      <button
                        type="button"
                        onClick={() => onToggleDate(habit.id, date)}
                        className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full border transition ${
                          isCompleted
                            ? "border-cyan-400 bg-cyan-400 text-white hover:bg-cyan-500"
                            : "border-gray-200 bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {isCompleted && "✓"}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* カレンダー */}
              <div className="mt-8">
                <div className="mb-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ←
                  </button>

                  <p className="mb-3 flex items-center gap-1 text-sm whitespace-nowrap text-gray-400">
                    <CalendarDays
                      size={16}
                      className="shrink-0 text-gray-400"
                    />
                    {currentDate.getFullYear()}.{currentDate.getMonth() + 1}月
                  </p>

                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    →
                  </button>
                </div>

                {/* 曜日 */}
                <div className="mb-2 grid grid-cols-7 gap-2 text-center">
                  {weekDays.map((day) => (
                    <p key={day} className="text-xs text-gray-400">
                      {day}
                    </p>
                  ))}
                </div>

                {/* 日付 */}
                <div className="grid grid-cols-7 gap-2 text-center">
                  {calendarDays.map((date, index) => {
                    if (date === null) {
                      return <div key={index}></div>;
                    }

                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");

                    const dateString = `${year}-${month}-${day}`;

                    const isCompleted =
                      habit.completedDates.includes(dateString);

                    return (
                      <div key={dateString} className="py-2">
                        <button
                          type="button"
                          onClick={() => onToggleDate(habit.id, dateString)}
                          className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition duration-200 hover:scale-105 ${
                            isCompleted
                              ? "bg-cyan-500 text-white"
                              : "text-gray-600"
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 削除ボタン */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => onDelete(habit.id)}
                className="border-red-400 flex h-8 w-8 items-center justify-center rounded-full border text-red-400 hover:text-red-600"
                aria-label="削除"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default HabitItem;
