// @generated by protoc-gen-connect-es v1.5.0 with parameter "target=ts"
// @generated from file api.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Query, SearchResponse } from "./api_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service SearchService
 */
export const SearchService = {
  typeName: "SearchService",
  methods: {
    /**
     * @generated from rpc SearchService.Search
     */
    search: {
      name: "Search",
      I: Query,
      O: SearchResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

