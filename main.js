$(function () {
  const $table = $("#table");
  const $total = $("#total");

  $table.on("click", ".delete", function () {
    const $tr = $(this).closest("tr");
    const id = $tr.data("id");
    $.post(`/delete/${id}`, {}, (resp) => {
      if (!resp.ok) return alert("Delete failed");
      $tr.remove();
      $total.text(Number(resp.total).toFixed(2));
    });
  });

  $table.on("click", ".edit", function () {
    const $tr = $(this).closest("tr");
    const id = $tr.data("id");

    const name = prompt("Enter new name:", $tr.find(".name").text());
    const value = parseFloat(prompt("Enter new value:", $tr.find(".value").text()));

    if (!name || isNaN(value)) return;

    $.post(`/edit/${id}`, { name, value }, (resp) => {
      if (!resp.ok) return alert("Edit failed");
      $tr.find(".name").text(name);
      $tr.find(".value").text(value.toFixed(2));
      $total.text(Number(resp.total).toFixed(2));
    });
  });
});