/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { TPromise } from 'vs/base/common/winjs.base';
import { IChannel } from 'vs/base/parts/ipc/common/ipc';
import { IIssueService } from './issue';

export interface IIssueChannel extends IChannel {
	call(command: 'openIssueReporter'): TPromise<void>;
	call(command: 'getStatusInfo'): TPromise<any>;
	call(command: string, arg?: any): TPromise<any>;
}

export class IssueChannel implements IIssueChannel {

	constructor(private service: IIssueService) { }

	call(command: string, arg?: any): TPromise<any> {
		switch (command) {
			case 'openIssueReporter':
				return this.service.openReporter();
			case 'getStatusInfo':
				return this.service.getStatusInfo();
		}
		return undefined;
	}
}

export class IssueChannelClient implements IIssueService {

	_serviceBrand: any;

	constructor(private channel: IIssueChannel) { }

	openReporter(): TPromise<void> {
		return this.channel.call('openIssueReporter');
	}

	getStatusInfo(): TPromise<any> {
		return this.channel.call('getStatusInfo');
	}
}