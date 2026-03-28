
function trimForm() {
  let inputs = document.querySelectorAll("input");

  inputs.forEach(input => {
    let type = input.type;

    // Only trim text-based inputs
    if (
      type === "text" ||
      type === "email" ||
      type === "password"
    ) {
      input.value = input.value.trim();
    }
  });

  return true;
}
