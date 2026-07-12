// click tag event
const le_EventClick = (selector, callback) => {
  document.addEventListener("click", (e) => {
    if (e.target.closest(selector)) {
      callback();
    } else {
      console.error(
        `element is undefined , Le_eventClick : ${e.target.closest(selector)} `
      );
    }
  });
};

// click tag
const le_ClickTag = (selector) => {
  if (document.querySelector(selector) != null) {
    document.querySelector(selector).click()
  } else {
    console.error(`element is undefined , Le_ClickTag  `);
  }
};

//get watcher
const get_Watcher = (selector, toJson = false) => {
  let element = document.querySelector(`[name="${selector}"]`);
  if (toJson) {

    return JSON.parse(element?.value);
  }
  return element?.value;
}

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

// toast
const le_conectToastifay = () => {
  let script = document.createElement("script");
  let style = document.createElement("link");

  script.setAttribute("src", "https://my.kerman.ir/storage/6788/toastify.js");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("id", "sctiptToast");
  // --------------------------------------------------------
  style.setAttribute(
    "href",
    "https://my.kerman.ir/storage/6787/Toastify.min.css"
  );
  style.setAttribute("type", "text/css");
  style.setAttribute("rel", "stylesheet");
  document.head.appendChild(style);
  document.head.appendChild(script);
};

// toast
const le_conectSwal = () => {
  let script = document.createElement("script");
  let style = document.createElement("link");

  script.setAttribute("src", "https://my.kerman.ir/storage/6743/sweetalert2.js");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("id", "sctiptToast");
  // --------------------------------------------------------
  style.setAttribute(
    "href",
    "https://my.kerman.ir/storage/3695/sweetalert2.css"
  );
  style.setAttribute("type", "text/css");
  style.setAttribute("rel", "stylesheet");
  document.head.appendChild(style);
  document.head.appendChild(script);
};

// good bad info warning => state
const le_Toast = (message, state = "good") => {
  let avatar;
  switch (state) {
    case "good":
      avatar = "https://my.kerman.ir/storage/6783/Flat_tick_icon.svg.png";
      break;
    case "bad":
      avatar =
        "https://my.kerman.ir/storage/6784/1200px-Flat_cross_icon.svg.png";
      break;
    case "info":
      avatar =
        "https://my.kerman.ir/storage/6786/1200px-Info_icon-72a7cf.svg.png";
      break;
    case "warning":
      avatar = "https://my.kerman.ir/storage/6785/Antu_dialog-warning.svg.png";
      break;
  }

  Toastify({
    text: message,
    duration: 3000,
    // destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: false,
    avatar: avatar,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#fff",
      color: "#272727",
      marginBottom: "90px",
      fontSize: "1.3rem",
    },
    onClick: function () { }, // Callback after click
  }).showToast();
};

// hide and show panels
const le_HidePanel = (selector) => {
  if (document.querySelector(selector) != null) {
    document.querySelector(selector).style.cssText = "display:none;";
  }
};

const le_ShowPanel = (selector, display) => {
  if (document.querySelector(selector) != null) {
    document.querySelector(selector).style.cssText = `display:${display};`;
  }
};

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
};

// convert number into dollar
const le_NumberToDolor = (number) => {
  return number.toLocaleString('en-US')
}

// create random number
const le_RandomNumber = (number = 10000) => {
  return Math.floor(Math.random() * number)
}

// write in time 
const le_wrtierTime = (text, id) => {
  let i = 0;
  let speed = 70;
  function typeWriter(text, id) {
    if (i < text.length) {
      document.querySelector(id).innerHTML += text.charAt(i);
      i++;
      setTimeout(() => typeWriter(text, id), speed);
    }
  }
  typeWriter(text, id)
};

// create script 
const le_CreateScript = (link, id) => {
  let script = document.createElement("script");
  script.setAttribute("src", link);
  script.setAttribute("type", "text/javascript");
  script.setAttribute("id", id);
  document.head.appendChild(script);
};

const le_fileUploader = (button, input, message) => {
  $(button).on('click', function () {
    $(input).click();
  });
  $(input).on('change', function () {
    const file = this.files[0];
    if (!file) return;
    $(message).text(file.name + " : با موفقیت اپلود شد").addClass('show');
    $(input).val('');
  });
}
