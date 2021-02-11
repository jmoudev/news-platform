export const convertPSQLTimestamp = PSQLTimestamp => {
  if (PSQLTimestamp) {
    const timeStr = PSQLTimestamp.toString();
    const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2})/;

    const timeStrMatch = timeStr.match(regex);

    return `${timeStrMatch[4]} ${timeStrMatch[3]}/${timeStrMatch[2]}/${timeStrMatch[1]}`;
  }
};
