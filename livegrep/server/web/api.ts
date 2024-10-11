/* Do not change, this code is generated from Golang structs */


export interface InnerError {
    code: string;
    message: string;
}
export interface ReplyError {
    error: InnerError;
}
export interface FacetValue {
    value: string;
    count: number;
}
export interface Facet {
    key: string;
    values: FacetValue[];
}
export interface Query {
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
}
export interface FileResult {
    tree: string;
    version: string;
    path: string;
    bounds: number[];
}
export interface LineResult {
    lno: number;
    context_before: string[];
    context_after: string[];
    bounds: number[];
    line: string;
    ClipBefore: boolean;
    ClipAfter: boolean;
}
export interface Result {
    tree: string;
    version: string;
    path: string;
    lines: LineResult[];
}
export interface Stats {
    total_time: number;
    why: string;
    ResultsCount: number;
    HasMore: boolean;
    QueryTime: number;
}
export interface ReplySearch {
    info?: Stats;
    results: Result[];
    file_results: FileResult[];
    search_type: string;
    query: Query;
    facets: Facet[];
}






export interface LinkConfig {
    match_regexp: RegExp;
    label: string;
    url_template: string;
    target: string;
}
export interface SearchScriptData {
    backend_repos: {[key: string]: string[]};
    link_configs: LinkConfig[];
}
export interface FileViewData {
    repo_name: string;
    url_pattern: string;
    file_path: string;
    commit: string;
}