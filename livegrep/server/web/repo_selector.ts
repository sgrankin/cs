/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

import jQuery from "jquery";
import { isEqual } from "underscore";

export function init() {
	jQuery("#repos").selectpicker({
		actionsBox: true,
		selectedTextFormat: "count > 4",
		countSelectedText: "({0} repositories)",
		noneSelectedText: "(all repositories)",
		liveSearch: true,
		width: "20em",
	});
	jQuery("#repos").on("refreshed.bs.select", () => {
		var headers = jQuery(this).parent().find(".dropdown-header");
		headers.css("cursor", "pointer");
		headers.on("click", (event) => {
			event.stopPropagation();
			var optgroup = jQuery('#repos optgroup[label="' + jQuery(this).text() + '"]');
			var allSelected = !optgroup.children("option:not(:selected)").length;
			optgroup.children().prop("selected", !allSelected);
			jQuery("#repos").selectpicker("refresh").trigger("change");
		});
	});
	jQuery(window).on("keyup", ".bootstrap-select .bs-searchbox input", (event) => {
		var keycode = event.keyCode ? event.keyCode : event.which;
		if (keycode == "13") {
			jQuery(this).val("");
			jQuery("#repos").selectpicker("refresh");
		}
	});
	jQuery(window).keyup((keyevent) => {
		var code = keyevent.keyCode ? keyevent.keyCode : keyevent.which;
		if (code == 9 && jQuery(".bootstrap-select button:focus").length) {
			jQuery("#repos").selectpicker("toggle");
			jQuery(".bootstrap-select .bs-searchbox input").focus();
		}
	});
}

export function updateOptions(newOptions) {
	// Skip update if the options are the same, to avoid losing selected state.
	var currentOptions = [];
	jQuery("#repos")
		.find("option")
		.each(() => {
			currentOptions.push(jQuery(this).attr("value"));
		});
	if (isEqual(currentOptions, newOptions)) {
		return;
	}

	jQuery("#repos").empty();

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

export function updateSelected(newSelected) {
	jQuery("#repos").selectpicker("val", newSelected);
}
