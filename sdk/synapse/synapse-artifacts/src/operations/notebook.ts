// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  NotebookResource,
  NotebookGetNotebooksByWorkspaceResponse,
  NotebookGetNotebookSummaryByWorkSpaceResponse,
  NotebookCreateOrUpdateNotebookOptionalParams,
  NotebookCreateOrUpdateNotebookResponse,
  NotebookGetNotebookOptionalParams,
  NotebookGetNotebookResponse,
  ArtifactRenameRequest,
  NotebookGetNotebooksByWorkspaceNextResponse,
  NotebookGetNotebookSummaryByWorkSpaceNextResponse
} from "../models";

/**
 * Class representing a Notebook.
 */
export class Notebook {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class Notebook class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Lists Notebooks.
   * @param options The options parameters.
   */
  public listNotebooksByWorkspace(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<NotebookResource> {
    const iter = this.getNotebooksByWorkspacePagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getNotebooksByWorkspacePagingPage(options);
      }
    };
  }

  private async *getNotebooksByWorkspacePagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<NotebookResource[]> {
    let result = await this._getNotebooksByWorkspace(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getNotebooksByWorkspaceNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getNotebooksByWorkspacePagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<NotebookResource> {
    for await (const page of this.getNotebooksByWorkspacePagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists a summary of Notebooks.
   * @param options The options parameters.
   */
  public listNotebookSummaryByWorkSpace(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<NotebookResource> {
    const iter = this.getNotebookSummaryByWorkSpacePagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getNotebookSummaryByWorkSpacePagingPage(options);
      }
    };
  }

  private async *getNotebookSummaryByWorkSpacePagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<NotebookResource[]> {
    let result = await this._getNotebookSummaryByWorkSpace(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getNotebookSummaryByWorkSpaceNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getNotebookSummaryByWorkSpacePagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<NotebookResource> {
    for await (const page of this.getNotebookSummaryByWorkSpacePagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists Notebooks.
   * @param options The options parameters.
   */
  private async _getNotebooksByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<NotebookGetNotebooksByWorkspaceResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getNotebooksByWorkspace",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getNotebooksByWorkspaceOperationSpec
      );
      return result as NotebookGetNotebooksByWorkspaceResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Lists a summary of Notebooks.
   * @param options The options parameters.
   */
  private async _getNotebookSummaryByWorkSpace(
    options?: coreHttp.OperationOptions
  ): Promise<NotebookGetNotebookSummaryByWorkSpaceResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getNotebookSummaryByWorkSpace",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getNotebookSummaryByWorkSpaceOperationSpec
      );
      return result as NotebookGetNotebookSummaryByWorkSpaceResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Creates or updates a Note Book.
   * @param notebookName The notebook name.
   * @param notebook Note book resource definition.
   * @param options The options parameters.
   */
  async createOrUpdateNotebook(
    notebookName: string,
    notebook: NotebookResource,
    options?: NotebookCreateOrUpdateNotebookOptionalParams
  ): Promise<LROPoller<NotebookCreateOrUpdateNotebookResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-createOrUpdateNotebook",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      notebookName,
      notebook,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as NotebookCreateOrUpdateNotebookResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateNotebookOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateNotebookOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a Note Book.
   * @param notebookName The notebook name.
   * @param options The options parameters.
   */
  async getNotebook(
    notebookName: string,
    options?: NotebookGetNotebookOptionalParams
  ): Promise<NotebookGetNotebookResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-getNotebook",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      notebookName,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getNotebookOperationSpec
      );
      return result as NotebookGetNotebookResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a Note book.
   * @param notebookName The notebook name.
   * @param options The options parameters.
   */
  async deleteNotebook(
    notebookName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-deleteNotebook",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      notebookName,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteNotebookOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteNotebookOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Renames a notebook.
   * @param notebookName The notebook name.
   * @param request proposed new name.
   * @param options The options parameters.
   */
  async renameNotebook(
    notebookName: string,
    request: ArtifactRenameRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-renameNotebook",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      notebookName,
      request,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      renameNotebookOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: renameNotebookOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * GetNotebooksByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetNotebooksByWorkspace
   *                 method.
   * @param options The options parameters.
   */
  private async _getNotebooksByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<NotebookGetNotebooksByWorkspaceNextResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getNotebooksByWorkspaceNext",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getNotebooksByWorkspaceNextOperationSpec
      );
      return result as NotebookGetNotebooksByWorkspaceNextResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * GetNotebookSummaryByWorkSpaceNext
   * @param nextLink The nextLink from the previous successful call to the GetNotebookSummaryByWorkSpace
   *                 method.
   * @param options The options parameters.
   */
  private async _getNotebookSummaryByWorkSpaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<NotebookGetNotebookSummaryByWorkSpaceNextResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getNotebookSummaryByWorkSpaceNext",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getNotebookSummaryByWorkSpaceNextOperationSpec
      );
      return result as NotebookGetNotebookSummaryByWorkSpaceNextResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getNotebooksByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/notebooks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const getNotebookSummaryByWorkSpaceOperationSpec: coreHttp.OperationSpec = {
  path: "/notebooks/summary",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateNotebookOperationSpec: coreHttp.OperationSpec = {
  path: "/notebooks/{notebookName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookResource
    },
    201: {
      bodyMapper: Mappers.NotebookResource
    },
    202: {
      bodyMapper: Mappers.NotebookResource
    },
    204: {
      bodyMapper: Mappers.NotebookResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.notebook,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.notebookName],
  headerParameters: [Parameters.accept, Parameters.contentType, Parameters.ifMatch],
  mediaType: "json",
  serializer
};
const getNotebookOperationSpec: coreHttp.OperationSpec = {
  path: "/notebooks/{notebookName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.notebookName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteNotebookOperationSpec: coreHttp.OperationSpec = {
  path: "/notebooks/{notebookName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.notebookName],
  headerParameters: [Parameters.accept],
  serializer
};
const renameNotebookOperationSpec: coreHttp.OperationSpec = {
  path: "/notebooks/{notebookName}/rename",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.request,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.notebookName],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getNotebooksByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
const getNotebookSummaryByWorkSpaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
