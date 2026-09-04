import { useEffect, useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import HabitList from "./components/HabitList";
import { CirclePlus } from "lucide-react";

// 継続日数を計算
const calculateStreak = (completedDates) => {
  const today = new Date();

  let streak = 0;

  for (let i = 0; ; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateString = date.toISOString().split("T")[0];

    if (completedDates.includes(dateString)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// 過去7日間の達成率を計算
const calculateCompletionRate = (completedDates) => {
  const today = new Date();

  let completedCount = 0;

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateString = date.toISOString().split("T")[0];

    if (completedDates.includes(dateString)) {
      completedCount++;
    }
  }

  return Math.round((completedCount / 7) * 100);
};

// 過去7日間の日付を作る
const getLast7Days = () => {
  const today = new Date();

  const dates = [];

  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    const dateString = date.toISOString().split("T")[0];

    dates.push(dateString);
  }

  return dates;
};

const App = () => {
  // 現在入力されている習慣名
  const [habit, setHabit] = useState("");

  // 登録されている習慣一覧
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");

    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  // localStorageに保存する
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const handleChange = (e) => {
    setHabit(e.target.value);
  };

  // 習慣追加ボタンの処理（習慣の追加）
  const handleAddHabit = () => {
    if (habit.trim() === "") {
      return;
    }

    const newHabit = {
      id: Date.now(),
      name: habit,
      completedDates: [],
    };

    setHabits([newHabit, ...habits]);

    setHabit("");
  };

  // 削除ボタンの処理（習慣の削除）
  const handleDeleteHabit = (id) => {
    const newHabits = habits.filter((habit) => {
      return habit.id !== id;
    });

    setHabits(newHabits);
  };

  // 日付の完了／未完了を切り替える
  const handleToggleDate = (habitId, date) => {
    const newHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDates.includes(date);

        const completedDates = isCompleted
          ? habit.completedDates.filter(
              (completedDate) => completedDate !== date,
            )
          : [...habit.completedDates, date];

        return {
          ...habit,
          completedDates: completedDates,
        };
      }

      return habit;
    });

    setHabits(newHabits);
  };

  // 指定した月の日付を作る
  const getCalendarDays = (date) => {
    const today = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    // 月初の曜日まで空白を入れる
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // 1日〜月末まで追加
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-6 text-3xl font-bold">Habit Tracker</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddHabit();
          }}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <Input
            value={habit}
            onChange={handleChange}
            placeholder="習慣を入力"
          />

          <Button
            type="submit"
            className="!m-0 !h-10 !w-10 !shrink-0 !rounded-full !bg-transparent !p-0 !text-xl"
            aria-label="追加"
          >
            <CirclePlus size={30} strokeWidth={1.5} className="text-cyan-500" />
          </Button>
        </form>

        {habits.length === 0 ? (
          <p className="text-center text-gray-400">
            まだ習慣がありません。習慣を追加してみましょう！
          </p>
        ) : (
          <HabitList
            habits={habits}
            onDelete={handleDeleteHabit}
            calculateStreak={calculateStreak}
            calculateCompletionRate={calculateCompletionRate}
            getLast7Days={getLast7Days}
            onToggleDate={handleToggleDate}
            getCalendarDays={getCalendarDays}
          />
        )}
      </div>
    </div>
  );
};

export default App;
