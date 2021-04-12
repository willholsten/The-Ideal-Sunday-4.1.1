(window.flitsApp && void 0 !== window.flitsApp) || (window.flitsApp = {}),
    (window.flitsApp.formatMoney = function (t, e) {
        "string" == typeof t && (t = t.replace(".", ""));
        var i = "",
            s = /\{\{\s*(\w+)\s*\}\}/,
            l = e || "${{amount}}";
        function a(t, e) {
            return void 0 === t ? e : t;
        }
        function r(t, e, i, s) {
            if (((e = a(e, 2)), (i = a(i, ",")), (s = a(s, ".")), isNaN(t) || null == t)) return 0;
            var l = (t = (t / 100).toFixed(e)).split(".");
            return l[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) + (l[1] ? s + l[1] : "");
        }
        switch (l.match(s)[1]) {
            case "amount":
                i = r(t, 2);
                break;
            case "amount_no_decimals":
                i = r(t, 0);
                break;
            case "amount_with_comma_separator":
                i = r(t, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                i = r(t, 0, ".", ",");
        }
        return l.replace(s, i);
    }),
    (window.flitsApp.loadScript = function (t, e, i) {
        var s = document.createElement("script");
        (s.type = "text/javascript"),
            s.readyState
                ? (s.onreadystatechange = function () {
                      ("loaded" != s.readyState && "complete" != s.readyState) || ((s.onreadystatechange = null), "function" == typeof i && i(e));
                  })
                : (s.onload = function () {
                      "function" == typeof i && i(e);
                  }),
            (s.src = t),
            document.getElementsByTagName("head")[0].appendChild(s);
    }),
    (window.flitsApp.loadStyle = function (t, e, i) {
        var s = document.createElement("link");
        (s.type = "text/css"),
            (s.rel = "stylesheet"),
            (s.media = "all"),
            s.readyState
                ? (s.onreadystatechange = function () {
                      ("loaded" != s.readyState && "complete" != s.readyState) || ((s.onreadystatechange = null), i(e));
                  })
                : (s.onload = function () {
                      i(e);
                  }),
            (s.href = t),
            document.getElementsByTagName("head")[0].appendChild(s);
    }),
    (window.flitsApp.showLoading = function (t, e) {
        var i = flitsAppJquery("<div style='text-align:center'>" + t + "</div>");
        flitsAppJquery(e).toast(i, { time: null });
    }),
    (window.flitsApp.urls = { js: { jQuery: "//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js" } }),
    (window.flitsApp.loadJquery = function (t) {
        var e = !1;
        if (window.jQuery) {
            var i = jQuery.fn.jquery.split(".");
            i[0] >= 2 && i[1] >= 2 && i[2] >= 4 ? ((flitsAppJquery = jQuery), t(jQuery)) : (e = !0);
        } else e = !0;
        e &&
            window.flitsApp.loadScript(window.flitsApp.urls.js.jQuery, t, function (t) {
                (flitsAppJquery = jQuery.noConflict(!0)), t(flitsAppJquery);
            });
    }),
    (window.flitsApp.jQueryLoaded = function (t) {
        window.flitsApp.addClickEvents(),
            window.flitsApp.setupPage(),
            window.flitsApp.shopifySetup(),
            window.flitsApp.registerPlugins(),
            window.flitsApp.resizeEvent(),
            window.flitsApp.addSubmitEvents(),
            window.flitsApp.addKeyEvents(),
            window.flitsApp.getData();
  			window.flitsApp.getOtpTree();
    }),
    (window.flitsApp.setupPage = function () {
        if ((flitsAppJquery(".flits-profile-birthdate").attr("max", window.flitsApp.getTodayDate()), void 0 === location.hash || null == location.hash || "" == location.hash.trim())) return !1;
        var t = location.hash.replace("#", "");
        flitsAppJquery("[data-href='#flits-page-" + t + "']").click();
    }),
    (window.flitsApp.getTodayDate = function () {
        var t = new Date(),
            e = t.getDate(),
            i = t.getMonth() + 1,
            s = t.getFullYear();
        return e < 10 && (e = "0" + e), i < 10 && (i = "0" + i), s + "-" + i + "-" + e;
    }),
  
    (window.flitsApp.getData = function () {
        window.flitsApp.updateCredits();
    }),
  window.flitsApp.getOtpTree = function () {
  var item = window.flits_orders_tree;
  var total=0;
  for(var i in item) { 
    total += item[i]; 
  }
  var get_order_number = flitsAppJquery('.customer_total_order').val(); 
  var total_tree_planted = parseInt(get_order_number) + total;
   flitsAppJquery('.flits-otp-tree-display').html(total_tree_planted);
  debugger;
   flitsAppJquery('.tree-order-count').css('opacity', '1');
  
 };
    (window.flitsApp.updateCredits = function () {
        var t = "/credit/get_credit";
        (t = flitsAppJquery("#flits-customer-url").val() + t),
            flitsAppJquery.ajax({
                url: t,
                method: "get",
                data: { token: flitsAppJquery("#flits-token").val() },
                success: function (t) {
                    var e = flitsAppJquery("#flits-shop-money-format").val();
                    if (t.status) {
                        var i = t.customer,
                            s = i.credit_log;
                        flitsAppJquery(".flits-earned-credits").html(window.flitsApp.formatMoney(Math.abs(i.total_earned_credits), e).replace(/((\,00)|(\.00))$/g, "")),
                            flitsAppJquery(".flits-spent-credits").html(window.flitsApp.formatMoney(Math.abs(i.total_spent_credits), e).replace(/((\,00)|(\.00))$/g, "")),
                            flitsAppJquery(".flits-current-credits").html(window.flitsApp.formatMoney(i.credits, e).replace(/((\,00)|(\.00))$/g, "")),
                            s.length > 0
                                ? (flitsAppJquery.each(s, function (t, i) {
                                      var s = flitsAppJquery("#flits-credit-log-template").clone();
                                      s.attr("id", "flits-log-" + i.id);
                                      var l = i.credits;
                                      (l =
                                          l > 0
                                              ? window.flitsApp.multilang.earned + " " + window.flitsApp.formatMoney(Math.abs(l), e).replace(/((\,00)|(\.00))$/g, "")
                                              : window.flitsApp.multilang.spent + " " + window.flitsApp.formatMoney(Math.abs(l), e).replace(/((\,00)|(\.00))$/g, "")),
                                          s.find(".flits-credit-col").html(l);
                                      var a = window.flitsApp.getCreditCommentMsg(i.comment);
                                      if ((s.find(".flits-credit-comment-col").html(a), s.find(".flits-credit-date-col").html(i.created_at), void 0 !== i.metafields && i.metafields.length > 0)) {
                                          var r = flitsAppJquery(".flits-credit-dropdown-svg-div").clone().removeClass("flits-credit-dropdown-svg-div");
                                          s.find(".flits-credit-col").append(r);
                                          var d = s.find(".flits-credit-details");
                                          flitsAppJquery.each(i.metafields, function (t, i) {
                                              var s = flitsAppJquery(".flits-credit-details-template").clone().removeClass("flits-credit-details-template"),
                                                  l = i.credits;
                                              (l = window.flitsApp.formatMoney(Math.abs(l), e).replace(/((\,00)|(\.00))$/g, "")), s.find(".flits-product-tag-credit").html(l);
                                              var a = flitsAppJquery("<a href='/products/" + i.product_handle + "?variant=" + i.variant_id + "' target='_blank'>" + i.product_title + "</a>"),
                                                  r = flitsAppJquery("<a href='/search?q=" + i.tag + "' target='_blank'>" + i.tag + "</a>");
                                              s.find(".flits-product-title").html(a), s.find(".flits-product-tag").html(r), d.append(s);
                                          }),
                                              s.append(d);
                                      }
                                      flitsAppJquery(".flits-credit-log").append(s);
                                  }),
                                  flitsAppJquery(".flits-credit-history-div").removeClass("flits-hidden"),
                                  flitsAppJquery(".flits-credit-history-empty").addClass("flits-hidden"))
                                : (flitsAppJquery(".flits-credit-history-empty").removeClass("flits-hidden"), flitsAppJquery(".flits-credit-history-div").addClass("flits-hidden"));
                    } else
                        flitsAppJquery(".flits-credit-history-empty").removeClass("flits-hidden"),
                            flitsAppJquery(".flits-credit-history-div").addClass("flits-hidden"),
                            flitsAppJquery(".flits-earned-credits").html(window.flitsApp.formatMoney(Math.abs(0), e).replace(/((\,00)|(\.00))$/g, "")),
                            flitsAppJquery(".flits-spent-credits").html(window.flitsApp.formatMoney(Math.abs(0), e).replace(/((\,00)|(\.00))$/g, "")),
                            flitsAppJquery(".flits-current-credits").html(window.flitsApp.formatMoney(0, e).replace(/((\,00)|(\.00))$/g, ""));
                },
                error: function (t) {
                    flitsAppJquery(".flits-code-snippet").addClass("flits-hidden"),
                        flitsAppJquery(".flits-code-snippet").parent().find(".flits-old-code-snippet").removeClass("flits-hidden"),
                        flitsAppJquery(".flits-code-snippet").parent().find(".flits-old-code-snippet").show(),
                        t.status;
                },
            });
    }),
    (window.flitsApp.getCreditCommentMsg = function (t) {
        switch (t) {
            case "Loyal Customer":
                return window.flitsApp.multilang.loyal_customer;
            case "Repeat customer":
                return window.flitsApp.multilang.repeat_customer;
            case "Fault in product":
                return window.flitsApp.multilang.fault_in_product;
            case "Canceled order first time by customer":
                return window.flitsApp.multilang.canceled_order_first_time_by_customer;
            case "Delay in delivery time":
                return window.flitsApp.multilang.delay_in_delivery_time;
            case "Registration Credit":
                return window.flitsApp.multilang.registration_credit;
            case "Subscribe Credit":
                return window.flitsApp.multilang.subscribe_credit;
            case "First Order Credit":
                return window.flitsApp.multilang.first_order_credit;
            default:
                if (t && t.includes("Spent in")) {
                    var e = "",
                        i = !1;
                    -1 != t.indexOf("Order through POS.") && ((t = t.replace("Order through POS.", "")), (i = !0));
                    if (t.includes(" - ")) {
                        var s = t.split(" - ");
                        (t = s[0]), (e = " - " + s[1]);
                    }
                    var l = (t = (t = t.replace("Spent in", "")).replace("Order.", "")).trim();
                    return (t = window.flitsApp.multilang.spent_in_order), i && (t = window.flitsApp.multilang.spent_in_order_through_pos), (t = t.replace("-1-1", l)) + e;
                }
                return t;
        }
    }),
    (window.flitsApp.shopifySetup = function () {
        Shopify && Shopify.CountryProvinceSelector && new Shopify.CountryProvinceSelector("AddressCountryNew", "AddressProvinceNew", { hideElement: "AddressProvinceContainerNew" });
    }),
    (window.flitsApp.addKeyEvents = function () {
        flitsAppJquery(document).on("change", "#flits-form-change-password input[name=password]", window.flitsApp.validatePassword),
            flitsAppJquery(document).on("keyup", "#flits-form-change-password input[name=password_confirmation]", window.flitsApp.validatePassword);
    }),
    (window.flitsApp.validatePassword = function () {
        var t = flitsAppJquery("#flits-form-change-password").find("input[name=password]")[0],
            e = flitsAppJquery("#flits-form-change-password").find("input[name=password_confirmation]")[0];
        t.value !== e.value ? e.setCustomValidity(window.flitsApp.multilang.password_not_match) : e.setCustomValidity("");
    }),
    (window.flitsApp.setupContainer = function () {
        if (flitsAppJquery(window).width() < 992)
            flitsAppJquery(".flits-nav-bar").css("height", "auto"),
                flitsAppJquery(".flits-pages").parent().css("height", "auto"),
                flitsAppJquery(".flits-nav").css("min-height", "auto"),
                flitsAppJquery(".flits-pages").css("min-height", "auto");
        else {
            var t = flitsAppJquery(".flits-nav-bar .flits-list-group").outerHeight(),
                e = flitsAppJquery(".flits-pages [data-type='page']:not(.flits-hidden)").outerHeight(),
                i = Math.max(t, e);
            (i += 20), flitsAppJquery(".flits-nav-bar").css("height", i), flitsAppJquery(".flits-pages").parent().css("height", i), flitsAppJquery(".flits-nav").css("min-height", i), flitsAppJquery(".flits-pages").css("min-height", i);
        }
    }),
    (window.flitsApp.resizeEvent = function () {
        setInterval(window.flitsApp.setupContainer, 1), window.flitsApp.setupContainer(), flitsAppJquery(window).resize(window.flitsApp.setupContainer);
    }),
    (window.flitsApp.addToCart = function (t, e, i) {
        var s = {
            type: "POST",
            url: "/cart/add.js",
            data: t,
            dataType: "json",
            success: function (t) {
                "function" == typeof e && e(t);
            },
            error: function (t) {
                "function" == typeof i && i(t);
            },
        };
        flitsAppJquery.ajax(s);
    }),
    (window.flitsApp.addSubmitEvents = function () {
        flitsAppJquery("[data-type='flits']").attr("disabled", !1),
            flitsAppJquery("#flits-form-profile").submit(function (t) {
                t.preventDefault();
                var e = flitsAppJquery(this),
                    i = e.serializeArray(),
                    s = flitsAppJquery("#flits-customer-url").val() + "/" + e.attr("data-action"),
                    l = e.attr("method");
                i.push({ name: "token", value: flitsAppJquery("#flits-token").val() }),
                    flitsApp.showLoading(window.flitsApp.multilang.save_details, flitsAppJquery("#flits-page-profile")),
                    flitsAppJquery.ajax({
                        url: s,
                        method: l,
                        data: i,
                        success: function (t) {
                            if (t.status) {
                                flitsAppJquery("#flits-page-profile").toast(window.flitsApp.multilang.saved_successfully),
                                    flitsAppJquery(".flits-hide-profile-edit").each(function (t, e) {
                                        flitsAppJquery(e).html(flitsAppJquery(e).next("input").val());
                                    });
                                var i = e.find("select[name=gender] option:selected").html();
                                e.find("select[name=gender]").closest(".flits-row").find(".flits-profile-gender-label").html(i), flitsAppJquery(".flits-profile-cancel-button").click();
                                flitsAppJquery("#flits-general-subscription").is(":checked") ? flitsAppJquery(".flits-accepts-marketing-label").html("Yes") : flitsAppJquery(".flits-accepts-marketing-label").html("No"),
                    flitsAppJquery(".flits-general-subscription-save-btn").click();
                            } else flitsAppJquery("#flits-page-profile").toast(window.flitsApp.multilang.something_went_wrong);
                        },
                        error: function (t) {
                            t.status, flitsAppJquery("#flits-page-profile").toast(t.statusText);
                        },
                    });
            }),
            flitsAppJquery("#flits-form-change-password").submit(function (t) {
                t.preventDefault();
                var e = flitsAppJquery(this),
                    i = e.serializeArray(),
                    s = flitsAppJquery("#flits-customer-url").val() + "/" + e.attr("data-action"),
                    l = e.attr("method");
                i.push({ name: "token", value: flitsAppJquery("#flits-token").val() }),
                    flitsApp.showLoading(window.flitsApp.multilang.updating_password, flitsAppJquery("#flits-page-security")),
                    flitsAppJquery.ajax({
                        url: s,
                        method: l,
                        data: i,
                        success: function (t) {
                            if (t.status) {
                                flitsAppJquery("#flits-page-security").toast(window.flitsApp.multilang.password_updated_successfully);
                                var i = flitsAppJquery("<form/>");
                                i.attr("action", "/account/login"),
                                    i.attr("method", "post"),
                                    i.append('<input type="email" name="customer[email]" value="' + flitsAppJquery("#flits-form-profile").find("input[name=email]").val() + '">'),
                                    i.append('<input type="hidden" name="checkout_url" value="' + location.href + '">'),
                                    i.append('<input type="password" name="customer[password]" value="' + flitsAppJquery("#flits-form-change-password").find("input[name=password]").val() + '">'),
                                    flitsAppJquery("body").append(i),
                                    e[0].reset(),
                                    i.submit();
                            } else flitsAppJquery("#flits-page-security").toast(t.error, { time: 2e3 });
                        },
                        error: function (t) {
                            t.status, flitsAppJquery("#flits-page-security").toast(t.statusText);
                        },
                    });
            }),
            flitsAppJquery(".flits-new-address-form form").submit(function (t) {
                t.preventDefault();
                var e = flitsAppJquery(this),
                    i = e.find("#form_type").val(),
                    s = e.serializeArray(),
                    l = e.attr("action");
                l = flitsAppJquery("#flits-customer-url").val() + l;
                var a = e.attr("method");
                s.push({ name: "token", value: flitsAppJquery("#flits-token").val() }),
                    "edit" == i
                        ? ((a = "PUT"), s.push({ name: "_method", value: "PUT" }), flitsApp.showLoading(window.flitsApp.multilang.updating_address, flitsAppJquery("#flits-page-address")))
                        : flitsApp.showLoading(window.flitsApp.multilang.adding_new_address, flitsAppJquery("#flits-page-address")),
                    flitsAppJquery.ajax({
                        url: l,
                        method: a,
                        data: s,
                        success: function (t) {
                            if (t.status) {
                                var s = t.address.data,
                                    l = flitsAppJquery("#flits-customer-address-template").clone();
                                "edit" == i && (l = flitsAppJquery("li[data-id='" + s.id + "']")),
                                    null == s.last_name && (s.last_name = ""),
                                    null == s.first_name && (s.first_name = ""),
                                    null == s.address1 && (s.address1 = ""),
                                    null == s.address2 && (s.address2 = ""),
                                    null == s.company && (s.company = ""),
                                    null == s.zip && (s.zip = ""),
                                    null == s.phone && (s.phone = ""),
                                    null == s.city && (s.city = ""),
                                    null == s.country && (s.country = ""),
                                    null == s.province && (s.province = ""),
                                    l.attr("data-id", s.id),
                                    l.attr("data-first-name", s.first_name),
                                    l.attr("data-last-name", s.last_name),
                                    l.attr("data-address1", s.address1),
                                    l.attr("data-address2", s.address2),
                                    l.attr("data-company", s.company),
                                    l.attr("data-zip", s.zip),
                                    l.attr("data-phone", s.phone),
                                    l.attr("data-city", s.city),
                                    l.attr("data-country", s.country),
                                    l.attr("data-province", s.province),
                                    s.default && flitsAppJquery(".flits-addresses-ul li").attr("data-default", "false"),
                                    l.attr("data-default", s.default ? "true" : "false"),
                                    l
                                        .find(".flits-address-name-row .flits-content")
                                        .attr("title", s.first_name + " " + s.last_name)
                                        .html(s.first_name + " " + s.last_name),
                                    l.find(".flits-company-row .flits-content").attr("title", s.company).html(s.company),
                                    l.find(".flits-address1-row .flits-content").attr("title", s.address1).html(s.address1),
                                    l.find(".flits-address2-row .flits-content").attr("title", s.address2).html(s.address2),
                                    l.find(".flits-company-row .flits-content").attr("title", s.company).html(s.company),
                                    l
                                        .find(".flits-city-row .flits-content")
                                        .attr("title", s.zip + " " + s.city + " " + s.province_code)
                                        .html(s.zip + " " + s.city + " " + s.province_code),
                                    l.find(".flits-country-row .flits-content").attr("title", s.country_name).html(s.country_name),
                                    l.find(".flits-edit-address-btn").attr("data-form-id", s.id),
                                    l.find(".flits-remove-address-btn").attr("data-form-id", s.id),
                                    s.default
                                        ? (flitsAppJquery(".flits-addresses-ul .flits-address-default .flits-address .flits-row:first strong").html("&nbsp;"),
                                          l.find(".flits-address .flits-row:first strong").html("Default"),
                                          l.addClass("flits-address-default"),
                                          flitsAppJquery(".flits-addresses-ul").prepend(l))
                                        : "edit" == i || flitsAppJquery(".flits-addresses-ul .flits-new-address-li").before(l),
                                    "edit" == i
                                        ? flitsAppJquery("#flits-page-address").toast(window.flitsApp.multilang.address_updated_successfully, { time: 2e3 })
                                        : flitsAppJquery("#flits-page-address").toast(window.flitsApp.multilang.address_added_successfully, { time: 2e3 }),
                                    flitsAppJquery(".flits-new-address-cancel-btn").click(),
                                    e[0].reset();
                            } else flitsAppJquery("#flits-page-address").toast(t.error, { time: 2e3 });
                        },
                        error: function (t) {
                            t.status, flitsAppJquery("#flits-page-address").toast(t.statusText);
                        },
                    });
            });
    }),
    (window.flitsApp.addClickEvents = function () {
        flitsAppJquery(document).on("click", ".flits-credit-dropdown", function (t) {
            t.preventDefault();
            var e = flitsAppJquery(this).closest("li"),
                i = flitsAppJquery(this).closest("li").find(".flits-credit-details");
            i.is(":visible")
                ? (flitsAppJquery(this).removeClass("flits-credit-dropdown-rotate"), e.removeClass("flits-bordered-div"), e.find(".flits-credit-log-with-dropdown").removeClass("flits-bold-text"))
                : (flitsAppJquery(this).addClass("flits-credit-dropdown-rotate"), e.addClass("flits-bordered-div"), e.find(".flits-credit-log-with-dropdown").addClass("flits-bold-text")),
                i.slideToggle();
        }),
            flitsAppJquery(document).on("click", ".flits-list-group-item[data-toggle='page']", function (t) {
                t.preventDefault();
                var e = flitsAppJquery(this).attr("data-href");
                flitsAppJquery(".flits-pages").find("[data-type='page']").addClass("flits-hidden"),
                    flitsAppJquery(e).removeClass("flits-hidden"),
                    (location.hash = e.replace("#flits-page-", "")),
                    flitsAppJquery(this).parent().find(".active").removeClass("active"),
                    flitsAppJquery(this).addClass("active"),
                    flitsAppJquery(".flits-page").addClass("flits-display-content");
            }),
            flitsAppJquery(document).on("click", ".flits-profile-edit-button", function (t) {
                flitsAppJquery(".flits-edit-button-row").addClass("flits-hidden"),
                    flitsAppJquery(".flits-save-button-row").removeClass("flits-hidden"),
                    flitsAppJquery(".flits-hide-profile-edit").addClass("flits-hidden"),
                    flitsAppJquery(".flits-hide-profile-cancel").removeClass("flits-hidden");
            }),
            flitsAppJquery(document).on("click", ".flits-profile-cancel-button", function (t) {
                flitsAppJquery(".flits-edit-button-row").removeClass("flits-hidden"),
                    flitsAppJquery(".flits-save-button-row").addClass("flits-hidden"),
                    flitsAppJquery(".flits-hide-profile-edit").removeClass("flits-hidden"),
                    flitsAppJquery(".flits-hide-profile-cancel").addClass("flits-hidden");
            }),
            flitsAppJquery(document).on("click", ".flits-return-to-menu", function (t) {
                flitsAppJquery(".flits-page").removeClass("flits-display-content");
            }),
            flitsAppJquery(document).on("click", ".flits-new-address-btn", function (t) {
                flitsAppJquery(".flits-new-address-btn").addClass("flits-hidden"),
                    flitsAppJquery(".flits-new-address-btn").parent().find(".flits-new-address-cancel-btn").removeClass("flits-hidden"),
                    flitsAppJquery(".flits-addresses-row").addClass("flits-hidden"),
                    flitsAppJquery(".flits-new-address-form").removeClass("flits-hidden"),
                    flitsAppJquery(".flits-new-address-form form").find("#form_type").val("new"),
                    flitsAppJquery(".flits-new-address-form form").attr("action", "/account/addresses"),
                    flitsAppJquery(".flits-new-address-form form").find("button[type=submit]").html(flitsAppJquery(".flits-new-address-form form").find("button[type=submit]").attr("data-add-text")),
                    flitsAppJquery(".flits-new-address-form form .flits-address-form-title").html(flitsAppJquery(".flits-new-address-form form .flits-address-form-title").attr("data-original-text")),
                    flitsAppJquery(".flits-new-address-form form")[0].reset();
            }),
            flitsAppJquery(document).on("click", ".flits-new-address-cancel-btn", function (t) {
                flitsAppJquery(".flits-new-address-btn").removeClass("flits-hidden"),
                    flitsAppJquery(".flits-new-address-btn").parent().find(".flits-new-address-cancel-btn").addClass("flits-hidden"),
                    flitsAppJquery(".flits-addresses-row").removeClass("flits-hidden"),
                    flitsAppJquery(".flits-new-address-form").addClass("flits-hidden"),
                    flitsAppJquery(".flits-new-address-form form")[0].reset();
            }),
            flitsAppJquery(document).on("click", ".flits-remove-address-btn", function () {
                var t = flitsAppJquery(this),
                    e = t.data("form-id"),
                    i = t.data("confirm-message");
                if (confirm(i || window.flitsApp.multilang.delete_address)) {
                    var s = "/account/addresses/" + e;
                    (s = flitsAppJquery("#flits-customer-url").val() + s),
                        flitsApp.showLoading(window.flitsApp.multilang.deleting_address, flitsAppJquery("#flits-page-address")),
                        flitsAppJquery.ajax({
                            url: s,
                            method: "DELETE",
                            data: { token: flitsAppJquery("#flits-token").val(), _mehtod: "DELETE" },
                            success: function (e) {
                                e.status
                                    ? (t.closest("li").remove(), window.flitsApp.setupContainer(), flitsAppJquery("#flits-page-address").toast(window.flitsApp.multilang.address_deleted_successfully, { time: 2e3 }))
                                    : flitsAppJquery("#flits-page-address").toast(e.error, { time: 2e3 });
                            },
                            error: function (t) {
                                t.status, flitsAppJquery("#flits-page-address").toast(t.statusText);
                            },
                        });
                }
            }),
            flitsAppJquery(document).on("click", ".flits-edit-address-btn", function () {
                var t = flitsAppJquery(this).closest("li"),
                    e = flitsAppJquery(".flits-new-address-form form");
                e.find("#AddressFirstNameNew").val(t.attr("data-first-name")),
                    e.find("#AddressLastNameNew").val(t.attr("data-last-name")),
                    e.find("#AddressAddress1New").val(t.attr("data-address1")),
                    e.find("#AddressAddress2New").val(t.attr("data-address2")),
                    e.find("#AddressCompanyNew").val(t.attr("data-company")),
                    e.find("#AddressZipNew").val(t.attr("data-zip")),
                    e.find("#AddressPhoneNew").val(t.attr("data-phone")),
                    e.find("#AddressCityNew").val(t.attr("data-city")),
                    e.find("#AddressCountryNew").val(t.attr("data-country")),
                    e.find("#AddressProvinceNew").val(t.attr("data-province")),
                    e.find("#address_default_address_new").attr("checked", "true" == t.attr("data-default")),
                    e.find("#form_type").val("edit"),
                    e.find(".flits-address-form-title").html(window.flitsApp.multilang.edit_address),
                    e.attr("action", "/account/addresses/" + flitsAppJquery(this).attr("data-form-id")),
                    e.find("button[type=submit]").html(e.find("button[type=submit]").attr("data-update-text")),
                    flitsAppJquery(".flits-new-address-btn").addClass("flits-hidden"),
                    flitsAppJquery(".flits-new-address-btn").parent().find(".flits-new-address-cancel-btn").removeClass("flits-hidden"),
                    flitsAppJquery(".flits-addresses-row").addClass("flits-hidden"),
                    flitsAppJquery(".flits-new-address-form").removeClass("flits-hidden");
            }),
            flitsAppJquery(document).on("click", ".flits-order-details-btn", function () {
                flitsAppJquery(this).closest(".flits-order-row").find(".flits-order-address-details-row").is(":visible")
                    ? flitsAppJquery(this).html(flitsAppJquery(this).attr("data-show-text"))
                    : flitsAppJquery(this).html(flitsAppJquery(this).attr("data-hide-text")),
                    flitsAppJquery(this).closest(".flits-order-row").find(".flits-order-address-details-row").slideToggle();
            }),
            flitsAppJquery(document).on("click", ".flits-re-order-btn", function () {
                var t = window.flits_orders[flitsAppJquery(this).attr("data-target")];
                flitsAppJquery(this).closest(".flits-row").toast(window.flitsApp.multilang.adding_items_to_cart, { position: "bottomLeft", time: null }), (window.flitsApp.not_found_products = 0), window.flitsApp.addToCartSync(0, t, this);
            });
      flitsAppJquery(document).on('click', '.flits-general-subscription-save-btn', function () {
      var btn = this;
      var that = this;
      var url = flitsAppJquery('#flits-customer-url').val() + "/" + 'general_subscription_save';
      flitsAppJquery(that).closest(".flits-subscription-content").toast(window.flitsApp.multilang.saving_details, {
        position: "bottomRight",
        time: null
      })
      //         flitsApp.showLoading(window.flitsApp.multilang.saving_details, flitsAppJquery('#flits-page-news-letter-subscription'));
      flitsAppJquery.ajax({
        url :url,
        method:'POST',
        data:{
          token: flitsAppJquery("#flits-token").val(),
          accepts_marketing:(flitsAppJquery('#flits-general-subscription').is(':checked')) ? 1 : 0
        },
        success:function(data){
          flitsAppJquery(that).closest(".flits-subscription-content").toast(window.flitsApp.multilang.saved_successfully, {
            position: "bottomRight",
            time: 1000
          })
        },
        error:function(){
          flitsAppJquery(that).closest(".flits-subscription-content").toast(window.flitsApp.multilang.something_went_wrong, {
            position: "bottomRight",
            time: 1000
          })
          flitsAppJquery('#flits-general-subscription').attr('checked',!flitsAppJquery('#flits-general-subscription').is(':checked'));
        }
      });
    });
    }),
    (window.flitsApp.addToCartSync = function (t, e, i) {
        var s = e[t],
            l = { id: s.variant_id, quantity: s.quantity };
        if (t + 1 == e.length)
            (a = function (t) {
                switch ((void 0 !== t.status && 404 == t.status && (window.flitsApp.not_found_products += 1), window.flitsApp.not_found_products)) {
                    case 0:
                        flitsAppJquery(i).closest(".flits-row").toast(window.flitsApp.multilang.items_added_to_cart, { position: "bottomLeft", time: 1e3 }), (location.href = "/cart");
                        break;
                    case 1:
                        if (1 == e.length) {
                            flitsAppJquery(i).closest(".flits-row").toast(window.flitsApp.multilang.product_is_deleted_from_shop, { position: "bottomLeft", time: 1e3 });
                            break;
                        }
                        flitsAppJquery(i).closest(".flits-row").toast(window.flitsApp.multilang.single_product_deleted, { position: "bottomLeft", time: 1e3 }), (location.href = "/cart");
                    default:
                        if (e.length == window.flitsApp.not_found_products) {
                            flitsAppJquery(i).closest(".flits-row").toast(window.flitsApp.multilang.all_products_deleted, { position: "bottomLeft", time: 1e3 });
                            break;
                        }
                        flitsAppJquery(i).closest(".flits-row").toast(window.flitsApp.multilang.some_products_deleted, { position: "bottomLeft", time: 1e3 }), (location.href = "/cart");
                }
            }),
                window.flitsApp.addToCart(l, a, a);
        else {
            var a = function () {
                window.flitsApp.addToCartSync(t + 1, e, i);
            };
            window.flitsApp.addToCart(l, a, function (s) {
                404 == s.status && (window.flitsApp.not_found_products += 1), window.flitsApp.addToCartSync(t + 1, e, i);
            });
        }
    }),
    (window.flitsApp.registerPlugins = function () {
        var t;
        (t = flitsAppJquery).fn.extend({
            toast: function (e, i) {
                var s = { position: "bottomRight", className: "", hideOlderMsgs: !0, time: 1e3, container: t(this), completeCallback: function () {} },
                    l = (i = t.extend(s, i)).position,
                    a = i.className,
                    r = i.hideOlderMsgs,
                    d = i.time,
                    n = i.completeCallback,
                    p = i.container;
                t(p).css({ position: "relative" });
                var o = t(p).find("#flits-toast-container-" + l);
                o.length <= 0 && (((o = document.createElement("div")).id = "flits-toast-container-" + l), (o.className = l), t(p).append(o));
                var f = (function (t) {
                    var e = document.createElement("div");
                    if ((e.classList.add("flits-toast"), a)) for (var i = a.split(" "), s = 0, l = i.length; s < l; s++) e.classList.add(i[s]);
                    return (
                        ("object" == typeof HTMLElement ? t instanceof HTMLElement : t && "object" == typeof t && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName)
                            ? e.appendChild(t)
                            : t instanceof flitsAppJquery
                            ? e.appendChild(t[0])
                            : (e.innerHTML = t),
                        e
                    );
                })(e);
                e && (r && t(o).html(""), t(o).append(f)), (f.style.top = "35px"), (f.style.opacity = 0), flitsAppJquery(f).animate({ top: "0px", opacity: 1 }, 100);
                var u,
                    c = d;
                null != c &&
                    (u = setInterval(function () {
                        null === f.parentNode && window.clearInterval(u),
                            f.classList.contains("panning") || (c -= 20),
                            c <= 0 &&
                                (flitsAppJquery(f).animate({ opacity: 0, marginTop: "-40px" }, 100, function () {
                                    "function" == typeof n && n(), this.parentNode.removeChild(this);
                                }),
                                window.clearInterval(u));
                    }, 20));
            },
        });
    }),
    window.jQuery || window.flitsAppJquery ? window.flitsAppJquery || window.flitsApp.loadJquery(window.flitsApp.jQueryLoaded) : ((window.flitsAppJquery = null), window.flitsApp.loadJquery(window.flitsApp.jQueryLoaded));
