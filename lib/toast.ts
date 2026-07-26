export const showToast = (payload: { title: string; message: string }) => {
  window.dispatchEvent(new CustomEvent("app:toast", { detail: payload }));
};
