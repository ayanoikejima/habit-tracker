import HabitItem from "./HabitItem";

const HabitList = ({
  habits,
  onDelete,
  onToggle,
  calculateStreak,
  calculateCompletionRate,
  getLast7Days,
  onToggleDate,
  getCalendarDays,
}) => {
  return (
    <ul className="space-y-3">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onDelete={onDelete}
          calculateStreak={calculateStreak}
          calculateCompletionRate={calculateCompletionRate}
          getLast7Days={getLast7Days}
          onToggleDate={onToggleDate}
          getCalendarDays={getCalendarDays}
        />
      ))}
    </ul>
  );
};

export default HabitList;
