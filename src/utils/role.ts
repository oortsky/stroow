export function getUserRole(id, payer, payee) {
  switch (id) {
    case payer:
      return {
        id: payer,
        label: "Payer",
        role: "payer",
      };
      break;
    case payee:
      return {
        id: payee,
        label: "Payee",
        role: "payee",
      };
      break;
    default:
      break;
  }
}
