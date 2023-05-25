function sortTable(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch, direction, switchcount = 0;
    table = document.getElementById("product-table");
    switching = true;
    direction = "asc";

    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];

            if (direction === "asc") {
                if (!isNaN(x.innerHTML) && !isNaN(y.innerHTML)) {
                    if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (direction === "desc") {
                if (!isNaN(x.innerHTML) && !isNaN(y.innerHTML)) {
                    if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && direction === "asc") {
                direction = "desc";
                switching = true;
            }
        }
    }

    // Удалить все иконки сортировки
    var sortIcons = document.getElementsByClassName("fas fa-sort");
    for (i = 0; i < sortIcons.length; i++) {
        sortIcons[i].classList.remove("fa-sort-up", "fa-sort-down");
    }

    // Добавить иконку сортировки к текущему заголовку столбца
    var currentSortIcon = document.getElementsByTagName("th")[columnIndex].getElementsByTagName("i")[0];
    currentSortIcon.classList.add(direction === "asc" ? "fa-sort-up" : "fa-sort-down");
}