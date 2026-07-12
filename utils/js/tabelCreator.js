function gregorianToJalali(date) {
    const inputDate = new Date(date);

    let gy = inputDate.getFullYear();
    const gm = inputDate.getMonth() + 1;
    const gd = inputDate.getDate();

    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const seconds = inputDate.getSeconds();
    const milliseconds = inputDate.getMilliseconds();

    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = (gy <= 1600) ? 0 : 979;

    gy -= (gy <= 1600) ? 621 : 1600;

    let gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) +
        Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];

    jy += 33 * Math.floor(days / 12053);
    days %= 12053;

    jy += 4 * Math.floor(days / 1461);
    days %= 1461;

    if (days > 365) {
        jy += Math.floor((days - 1) / 365);
        days = (days - 1) % 365;
    }

    let jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
    let jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));

    const padZero = (num) => num.toString().padStart(2, '0');

    const jalaliDateTimeString = `${padZero(hours)}:${padZero(minutes)} - ${jy}/${padZero(jm)}/${padZero(jd)}`;

    return {
        jy,
        jm,
        jd,
        hours,
        minutes,
        seconds,
        milliseconds,
        dateTime: jalaliDateTimeString
    };
}

const tabelTrCreator = (arr) => {
    let htmlStorage = '';
    arr.forEach(e => {
        if (e?.request_id) {
            htmlStorage += `<tr>
            <td>${e.request_id}</td>
            <td>
                <a href="/requests/${e.request_id}" target="_blank" class="link-normal">  ${e.request_name} </a>
            </td>
            <td>${gregorianToJalali(e.created_at).dateTime}</td>
            <td>
                <a class="action-button router-link" title="${e.task_name}"   href="/tasks/${e.task_id}/edit" target="_blank">
                    ${e.task_name}
                </a>
            </td>
        </tr>`
        } else {
            htmlStorage += `<tr>
            <td></td>
            <td>
                <a  class="link-normal">  </a>
            </td>
            <td></td>
            <td>
            </td>
        </tr>`
        }
    })
    return htmlStorage;
}

const cartMobileCreator = (arr) => {
    let htmlCards = '';
    arr.forEach(e => {
        if (e?.request_id) {
            htmlCards += `
        <div class="card-bill" >
            <div class="title-head">
                <p>${e.request_id}</p>
            </div>

            <div class="title-text">
                <h4>شناسه درخواست :</h4>
                <p>
                    <span> ${e.request_name}</span>
                </p>
            </div>
            <div class="title-text">
                <h4> زمان : </h4>
                <p>
                    <span>${gregorianToJalali(e.created_at).dateTime}</span>
                </p>
            </div>
            <div class="title-text">
                <a class="request-card router-link"  href="/tasks/${e.task_id}/edit"  title="${e.task_name}"
                    target="_blank">
                    <p class="PBtn w-100" style="text-align:center">
                    ${e.task_name}
                    </p>
                </a>
            </div>
       </div>
            `
        } else {
            htmlCards += `
            <div class="card-bill" >
                <div class="title-head">
                </div>
    
                <div class="title-text">
                    <h4>شناسه درخواست :</h4>
                    <p>
                    </p>
                </div>
                <div class="title-text">
                    <h4> زمان : </h4>
                    <p>
                    </p>
                </div>
                <div class="title-text">
                    <a class="request-card router-link" 
                        target="_blank">
                        <p class="PBtn w-100" style="text-align:center">
                        </p>
                    </a>
                </div>
           </div>
                `
        }
    })

    return htmlCards;
}


if (this.search_inprogress?.data && this.search_complete?.data) {
    document.querySelector("#progressTabel tbody").innerHTML = tabelTrCreator(this.search_inprogress?.data);
    document.querySelector("#compeleteTabel tbody").innerHTML = tabelTrCreator(this.search_complete?.data);
    document.querySelector("#mobileProgress").innerHTML = cartMobileCreator(this.search_inprogress?.data);
    document.querySelector("#mobileComplete").innerHTML = cartMobileCreator(this.search_complete?.data);
}

