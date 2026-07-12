let combo;
// change component value
const le_ChangeValue = (selector, value) => {
    let element = document.querySelector(selector);

    if (!!element) {
        element.value = value;
        element.dispatchEvent(new Event("input"));
    } else {
        console.error(
            `Error in changing value the selector:${selector} can not be found in your page`
        );
    }
};

// jsLoader
const leLoaderJS = (selector, callback) => {
    if (document.querySelector(selector) && document.querySelector("[name='jsLoader']")) {
        if (document.querySelector("[name='jsLoader']").value != "ok") {
            callback()
        }
        le_ChangeValue("[name='jsLoader']", "ok");
    }

}

// timeOut 3 set
const le_TimeOutCallBack = (callback) => {
    setTimeout(() => {
        callback();
    }, 1000);
    setTimeout(() => {
        callback();
    }, 2000);
    setTimeout(() => {
        callback();
    }, 3000);
    setTimeout(() => {
        callback();
    }, 4000);
    setTimeout(() => {
        callback();
    }, 5000);
    setTimeout(() => {
        callback();
    }, 6000);
};

function createComboBox(selector, data = [], cb = () => { }) {

    const comboElement = document.querySelector(selector);
    if (!comboElement) return;

    const comboInput = comboElement.querySelector("input");
    const comboMainList = comboElement.querySelector(".comboBoxMain");
    const comboListContainer = comboMainList.querySelector("ul");

    let selectedValue = null;
    let originalData = [...data];

    function renderList(items) {

        if (!items.length) {
            comboListContainer.innerHTML = `
                <li class="notFoundComboBox">
                    <span>موردی یافت نشد !</span>
                </li>
            `;
            return;
        }

        comboListContainer.innerHTML = items.map(item => `
            <li class="comboBoxItem" 
                data-id="${item.id}" data-name="${item.name}">
                ${item.title}
            </li>
        `).join("");
    }

    comboInput.addEventListener("input", (e) => {

        const value = e.target.value.trim();

        if (!value) {
            renderList(originalData);
            return;
        }

        const filtered = originalData.filter(item =>
            item.title.includes(value)
        );

        renderList(filtered);
    });

    comboInput.addEventListener("focus", () => {
        comboMainList.classList.remove("d-none");
    });

    document.addEventListener("click", (e) => {

        const clickedItem = e.target.closest(".comboBoxItem");

        if (clickedItem && comboElement.contains(clickedItem)) {

            comboMainList
                .querySelectorAll(".comboBoxItem")
                .forEach(item => item.classList.remove("active"));

            clickedItem.classList.add("active");

            selectedId = clickedItem.dataset.id;
            selectedName = clickedItem.dataset.name;

            comboInput.value = clickedItem.textContent.trim();

            comboMainList.classList.add("d-none");
            cb(selectedId, selectedName)
            return;
        }

        if (!comboElement.contains(e.target)) {
            comboMainList.classList.add("d-none");
        }

    });

    const resetComboBox = () => {
        comboMainList
            .querySelectorAll(".comboBoxItem")
            .forEach(item => item.classList.remove("active"));
        le_ChangeValue("[name='text_search']", "");
        document.querySelector("#request_Servies_box input").value = "";
        document.querySelector("#searchBar_reqest").value = "";
    }

    renderList(originalData);

    return {
        getValue: () => selectedValue,
        setData: (newData) => {
            originalData = [...newData];
            renderList(originalData);
        }, resetComboBox
    };
}

le_TimeOutCallBack(() => {
    leLoaderJS(".titlePanel", () => {
        $("#searchBar_reqest").change((e) => {
            le_ChangeValue("[name='text_search']", e.target.value);
        });

        // req state 
        $("#state_1")?.click(() => {
            document.querySelector('.slideMover').style.cssText = "right:0px";
            document.querySelector("#progressTabel").classList.remove("d-none");
            document.querySelector("#compeleteTabel").classList.add("d-none");

            document.querySelector("#mobileProgress").classList.remove("d-none");
            document.querySelector("#mobileComplete").classList.add("d-none");

            document.querySelector("[selector='pagination_progress']").classList.remove("d-none");
            document.querySelector("[selector='pagination_complete']").classList.remove("d-active");

            le_ChangeValue("[name='text_search']", "");
            combo?.resetComboBox();

        });

        $("#state_2")?.click(() => {
            document.querySelector('.slideMover').style.cssText = "right:110px";
            document.querySelector("#progressTabel").classList.add("d-none");
            document.querySelector("#compeleteTabel").classList.remove("d-none");

            document.querySelector("#mobileProgress").classList.add("d-none");
            document.querySelector("#mobileComplete").classList.remove("d-none");

            document.querySelector("[selector='pagination_progress']").classList.add("d-none");
            document.querySelector("[selector='pagination_complete']").classList.add("d-active");

            le_ChangeValue("[name='text_search']", "");
            combo?.resetComboBox();


        });

        // search types 
        $("#searchType_req")?.click(() => {
            document.querySelector("#searchType_req").classList.add("active_Item_B");
            document.querySelector("#searchType_servise").classList.remove("active_Item_B");
            le_ChangeValue("[name='type_serach_input']", "req_id")
            document.querySelector("#request_Search_box").classList.remove("d-none")
            document.querySelector("#request_Servies_box").classList.add("d-none")
        });

        $("#searchType_servise")?.click(() => {
            document.querySelector("#searchType_req").classList.remove("active_Item_B");
            document.querySelector("#searchType_servise").classList.add("active_Item_B");
            le_ChangeValue("[name='type_serach_input']", "name")
            document.querySelector("#request_Search_box").classList.add("d-none")
            document.querySelector("#request_Servies_box").classList.remove("d-none")
        });

        // date pikers 
        $("#date_start")?.click(() => {
            document.querySelectorAll(".vpd-icon-btn")[0].click();
        });

        $("#date_end")?.click(() => {
            document.querySelectorAll(".vpd-icon-btn")[1].click();
        });

        $("#searchFillters")?.click(() => {
            document.querySelector("[name='search']").click();
        });
    })
})


if (this.serviesList_getAsScript) {
    combo = createComboBox(
        "#searchBar_serviesBox",
        this.serviesList_getAsScript,
        (id, name) => {
            le_ChangeValue("[name='text_search']", name)
        }
    );
}