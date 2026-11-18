/* ИП Тручок А.С. · кондиционеры — меню, симптомы, заявка */
(function () {
  "use strict";
  var PHONE = "375445465605";

  var burger = document.getElementById("burger");
  var drawer = document.getElementById("drawer");
  var dclose = document.getElementById("drawerClose");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.setAttribute("data-open", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger) burger.addEventListener("click", function () { setDrawer(true); });
  if (dclose) dclose.addEventListener("click", function () { setDrawer(false); });
  if (drawer) drawer.addEventListener("click", function (e) { if (e.target === drawer) setDrawer(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setDrawer(false); });

  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq__i");
      var open = item.getAttribute("data-open") === "true";
      item.parentElement.querySelectorAll('.faq__i[data-open="true"]').forEach(function (o) {
        if (o !== item) o.setAttribute("data-open", "false");
      });
      item.setAttribute("data-open", open ? "false" : "true");
      q.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  /* симптомы: список слева — панель справа */
  var symWrap = document.getElementById("sym");
  if (symWrap) {
    var data = {
      cool: {
        t: "Не охлаждает",
        p: "Самая частая причина — не хватка фреона из-за утечки, реже: грязный теплообменник, неисправный компрессор или датчик. Смотрим давление в контуре и работу узлов.",
        l: ["Проверка давления и поиск утечки", "Оценка компрессора и конденсатора", "Заправка фреона при подтверждённой утечке"]
      },
      on: {
        t: "Не включается",
        p: "Обычно дело в питании, плате управления или защите по ошибке. Диагностика покажет, что именно блокирует запуск.",
        l: ["Проверка питания и предохранителей", "Диагностика платы управления", "Проверка датчиков и защит"]
      },
      leak: {
        t: "Течёт",
        p: "Конденсат должен уходить в дренаж. Если течёт — засорился дренаж, сместился уклон или вышла из строя помпа.",
        l: ["Чистка дренажной системы", "Проверка уклона и поддона", "Монтаж или замена помпы"]
      },
      noise: {
        t: "Шумит",
        p: "Шум даёт вентилятор, подшипник двигателя, крепление блока или вибрация внешнего блока. Находим источник, а не «глушим» его.",
        l: ["Проверка вентилятора и двигателя", "Крепления и вибрация блоков", "Балансировка и устранение люфтов"]
      },
      err: {
        t: "Выдаёт ошибку",
        p: "Код ошибки — это подсказка, а не приговор. Расшифровываем и проверяем конкретный узел, чтобы не менять детали наугад.",
        l: ["Считывание кода и расшифровка", "Проверка узла по коду", "Ремонт вместо замены блока, если это возможно"]
      },
      frost: {
        t: "Обмерзают трубки",
        p: "Обмерзание говорит о нехватке фреона, проблемах с обдувом или загрязнённом испарителе. Систему нельзя просто «дозаправить».",
        l: ["Поиск утечки и опрессовка", "Вакуумирование системы", "Проверка обдува и испарителя"]
      }
    };
    var btns = symWrap.querySelectorAll("button[data-sym]");
    var out = document.getElementById("symOut");
    function render(key) {
      var d = data[key];
      btns.forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-sym") === key ? "true" : "false"); });
      out.innerHTML = '<span class="lbl">Симптом</span><h3>' + d.t + '</h3><p>' + d.p + '</p><ul>' +
        d.l.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul>';
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () { render(b.getAttribute("data-sym")); });
    });
    render(btns[0].getAttribute("data-sym"));
  }

  document.querySelectorAll("form[data-wa]").forEach(function (form) {
    var box = form.querySelector(".formout");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var phoneEl = form.querySelector('[name="phone"]');
      var phone = phoneEl ? phoneEl.value.trim() : "";
      if (phone.replace(/\D/g, "").length < 6) {
        if (box) { box.className = "formout msg--err"; box.textContent = "Укажите телефон — перезвоним и договоримся о выезде."; }
        if (phoneEl) phoneEl.focus();
        return;
      }
      var labels = { name: "Имя", phone: "Телефон", what: "Что нужно", object: "Объект", message: "Описание" };
      var lines = ["Здравствуйте! Заявка с сайта: кондиционеры."];
      ["name", "phone", "what", "object", "message"].forEach(function (k) {
        var el = form.querySelector('[name="' + k + '"]');
        if (el && el.value && el.value.trim()) lines.push(labels[k] + ": " + el.value.trim());
      });
      lines.push(form.getAttribute("data-wa") || "Прошу диагностику.");
      window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
      if (box) { box.className = "formout"; box.textContent = "Открыли WhatsApp с готовым сообщением — останется нажать «Отправить»."; }
    });
  });

  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
