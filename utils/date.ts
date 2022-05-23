export const getAge = (date: string): number => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const getExplicitDate = (date: string): string => {
  const d = new Date(date);

  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);

  return `${day} ${month} ${year}`;
};
