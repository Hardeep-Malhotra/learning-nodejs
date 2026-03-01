// ==========================================
// 📦 USER-DEFINED MODULE
// File: greeting.js
// ==========================================

// ------------------------------
// 🔹 Named Export
// ------------------------------
export function sayGoodbye() {
  return "Goodbye! Have a great day!";
}

// ------------------------------
// 🔹 Another Named Export
// ------------------------------
export function getTimeOfDay(hour) {
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
}

// ------------------------------
// 🔹 Default Export
// ------------------------------
export default function getGreeting(hour) {
  if (hour < 5 || hour >= 19) {
    return "Good night";
  } else if (hour < 12) {
    return "Good morning";
  } else {
    return "Good evening";
  }
}
