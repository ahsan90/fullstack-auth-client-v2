const formatDate = (dateString: any) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  } as any;
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default formatDate;
