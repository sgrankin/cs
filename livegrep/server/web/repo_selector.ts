/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

import jQuery from "jquery";
function repoSelector(): JQuery<HTMLSelectElement> {
    return jQuery("#repos");
}

export function init() {
    let repos = repoSelector();
    repos.selectpicker({
        actionsBox: true,
        selectedTextFormat: "count > 4",
        countSelectedText: "({0} repositories)",
        noneSelectedText: "(all repositories)",
        liveSearch: true,
        width: "20em",
    });
    repos.on("refreshed.bs.select", () => {
        let headers = jQuery(this).parent().find(".dropdown-header");
        headers.css("cursor", "pointer");
        headers.on("click", (event) => {
            event.stopPropagation();
            let optgroup = jQuery('#repos optgroup[label="' + jQuery(this).text() + '"]');
            let allSelected = !optgroup.children("option:not(:selected)").length;
            optgroup.children().prop("selected", !allSelected);
            repos.selectpicker("refresh").trigger("change");
        });
    });
    jQuery(window).on("keyup", ".bootstrap-select .bs-searchbox input", (event) => {
        if (event.key == "Enter") {
            jQuery(this).val("");
            repos.selectpicker("refresh");
        }
    });
    jQuery(window).on("keyup", (keyevent) => {
        if (keyevent.key == "Tab" && jQuery(".bootstrap-select button:focus").length) {
            repos.selectpicker("toggle");
            jQuery(".bootstrap-select .bs-searchbox input").trigger("focus");
        }
    });
}

export function updateOptions(newOptions: string[]) {
    // Skip update if the options are the same, to avoid losing selected state.
    let currentOptions: string[] = [];
    let repos = repoSelector();
    repos.find("option").each(() => {
        currentOptions.push(jQuery(this).attr("value"));
    });
    if (
        currentOptions.length == newOptions.length &&
        currentOptions.every((v, i) => v == newOptions[i])
    ) {
        return;
    }

    repos.empty();
    newOptions.sort();
    let groups = new Map();
    groups.set("/", repos);

    for (let i = 0; i < newOptions.length; i++) {
        let path = newOptions[i].split("/");
        let group = path.slice(0, path.length - 1).join("/") + "/";
        let option = path[path.length - 1];

        if (!groups.has(group)) {
            let groupDOM = jQuery("<optgroup>").attr("label", group);
            repos.append(groupDOM);
            groups.set(group, groupDOM);
        }
        groups.get(group).append(
            jQuery("<option>")
                .attr("value", group + option) // Value is the full path.
                .attr("data-tokens", group + option) // Search will also include the full path.
                .text(option),
        );
    }

    groups.clear();
    repos.selectpicker("refresh");
}

export function updateSelected(newSelected: string[]) {
    repoSelector().selectpicker("val", newSelected);
}
