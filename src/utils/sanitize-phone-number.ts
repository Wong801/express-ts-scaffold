export default function (phoneNumber: string) {
  let sanitized = phoneNumber.replace(/\D/g, '');
  if (sanitized.startsWith('62')) {
    sanitized = '0' + sanitized.slice(2);
  }

  return sanitized;
};
