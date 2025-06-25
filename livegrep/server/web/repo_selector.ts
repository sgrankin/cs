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
		var headers = jQuery(this).parent().find(".dropdown-header");
		headers.css("cursor", "pointer");
		headers.on("click", (event) => {
			event.stopPropagation();
			var optgroup = jQuery('#repos optgroup[label="' + jQuery(this).text() + '"]');
			var allSelected = !optgroup.children("option:not(:selected)").length;
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

export function updateOptions(newOptions: any[]) {
	// Skip update if the options are the same, to avoid losing selected state.
	var currentOptions: string[] = [];
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
	var groups = new Map();
	groups.set("/", jQuery("#repos"));

	for (var i = 0; i < newOptions.length; i++) {
		var path = newOptions[i].split("/");
		var group = path.slice(0, path.length - 1).join("/") + "/";
		var option = path[path.length - 1];

		if (!groups.has(group)) {
			var groupDOM = jQuery("<optgroup>").attr("label", group);
			jQuery("#repos").append(groupDOM);
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
	jQuery("#repos").selectpicker("refresh");
}

export function updateSelected(newSelected: string[]) {
	jQuery("#repos").selectpicker("val", newSelected);
}
