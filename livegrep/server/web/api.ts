/* Do not change, this code is generated from Golang structs */


export class InnerError {
    code: string;
    message: string;

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.code = source["code"];
        this.message = source["message"];
    }
}
export class ReplyError {
    error: InnerError;

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.error = this.convertValues(source["error"], InnerError);
    }

	convertValues(a: any, classs: any, asMap: boolean = false): any {
	    if (!a) {
	        return a;
	    }
	    if (Array.isArray(a)) {
	        return (a as any[]).map(elem => this.convertValues(elem, classs));
	    } else if ("object" === typeof a) {
	        if (asMap) {
	            for (const key of Object.keys(a)) {
	                a[key] = new classs(a[key]);
	            }
	            return a;
	        }
	        return new classs(a);
	    }
	    return a;
	}
}
export class FacetValue {
    value: string;
    count: number;

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.value = source["value"];
        this.count = source["count"];
    }
}
export class Facet {
    key: string;
    values: FacetValue[];

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.key = source["key"];
        this.values = this.convertValues(source["values"], FacetValue);
    }

	convertValues(a: any, classs: any, asMap: boolean = false): any {
	    if (!a) {
	        return a;
	    }
	    if (Array.isArray(a)) {
	        return (a as any[]).map(elem => this.convertValues(elem, classs));
	    } else if ("object" === typeof a) {
	        if (asMap) {
	            for (const key of Object.keys(a)) {
	                a[key] = new classs(a[key]);
	            }
	            return a;
	        }
	        return new classs(a);
	    }
	    return a;
	}
}
export class Query {
    Line: string;
    File: string[];
    NotFile: string[];
    Repo: string;
    NotRepo: string;
    Tags: string;
    NotTags: string;
    RepoFilter: string[];
    FoldCase: boolean;
    MaxMatches: number;
    FilenameOnly: boolean;
    ContextLines: number;

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.Line = source["Line"];
        this.File = source["File"];
        this.NotFile = source["NotFile"];
        this.Repo = source["Repo"];
        this.NotRepo = source["NotRepo"];
        this.Tags = source["Tags"];
        this.NotTags = source["NotTags"];
        this.RepoFilter = source["RepoFilter"];
        this.FoldCase = source["FoldCase"];
        this.MaxMatches = source["MaxMatches"];
        this.FilenameOnly = source["FilenameOnly"];
        this.ContextLines = source["ContextLines"];
    }
}
export class FileResult {
    tree: string;
    version: string;
    path: string;
    bounds: number[];

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.tree = source["tree"];
        this.version = source["version"];
        this.path = source["path"];
        this.bounds = source["bounds"];
    }
}
export class LineResult {
    lno: number;
    context_before: string[];
    context_after: string[];
    bounds: number[];
    line: string;

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.lno = source["lno"];
        this.context_before = source["context_before"];
        this.context_after = source["context_after"];
        this.bounds = source["bounds"];
        this.line = source["line"];
    }
}
export class Result {
    tree: string;
    version: string;
    path: string;
    lines: LineResult[];

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.tree = source["tree"];
        this.version = source["version"];
        this.path = source["path"];
        this.lines = this.convertValues(source["lines"], LineResult);
    }

	convertValues(a: any, classs: any, asMap: boolean = false): any {
	    if (!a) {
	        return a;
	    }
	    if (Array.isArray(a)) {
	        return (a as any[]).map(elem => this.convertValues(elem, classs));
	    } else if ("object" === typeof a) {
	        if (asMap) {
	            for (const key of Object.keys(a)) {
	                a[key] = new classs(a[key]);
	            }
	            return a;
	        }
	        return new classs(a);
	    }
	    return a;
	}
}
export class Stats {
    total_time: number;
    why: string;

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.total_time = source["total_time"];
        this.why = source["why"];
    }
}
export class ReplySearch {
    info?: Stats;
    results: Result[];
    file_results: FileResult[];
    search_type: string;
    query: Query;
    facets: Facet[];

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.info = this.convertValues(source["info"], Stats);
        this.results = this.convertValues(source["results"], Result);
        this.file_results = this.convertValues(source["file_results"], FileResult);
        this.search_type = source["search_type"];
        this.query = this.convertValues(source["query"], Query);
        this.facets = this.convertValues(source["facets"], Facet);
    }

	convertValues(a: any, classs: any, asMap: boolean = false): any {
	    if (!a) {
	        return a;
	    }
	    if (Array.isArray(a)) {
	        return (a as any[]).map(elem => this.convertValues(elem, classs));
	    } else if ("object" === typeof a) {
	        if (asMap) {
	            for (const key of Object.keys(a)) {
	                a[key] = new classs(a[key]);
	            }
	            return a;
	        }
	        return new classs(a);
	    }
	    return a;
	}
}






export class LinkConfig {
    match_regexp: RegExp;
    label: string;
    url_template: string;
    target: string;

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.match_regexp = new RegExp(source["match_regexp"]);
        this.label = source["label"];
        this.url_template = source["url_template"];
        this.target = source["target"];
    }
}
export class SearchScriptData {
    backend_repos: {[key: string]: string[]};
    link_configs: LinkConfig[];

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.backend_repos = source["backend_repos"];
        this.link_configs = this.convertValues(source["link_configs"], LinkConfig);
    }

	convertValues(a: any, classs: any, asMap: boolean = false): any {
	    if (!a) {
	        return a;
	    }
	    if (Array.isArray(a)) {
	        return (a as any[]).map(elem => this.convertValues(elem, classs));
	    } else if ("object" === typeof a) {
	        if (asMap) {
	            for (const key of Object.keys(a)) {
	                a[key] = new classs(a[key]);
	            }
	            return a;
	        }
	        return new classs(a);
	    }
	    return a;
	}
}
export class FileViewData {
    repo_name: string;
    url_pattern: string;
    file_path: string;
    commit: string;

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.repo_name = source["repo_name"];
        this.url_pattern = source["url_pattern"];
        this.file_path = source["file_path"];
        this.commit = source["commit"];
    }
}