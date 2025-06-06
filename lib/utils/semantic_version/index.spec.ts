/**
 * Copyright 2025, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { describe, it, expect } from 'vitest';
import * as semanticVersion from '.';

describe('compareVersion', () => {
  it('should return 0 if user version and target version are equal', () => {
    const versions = [
      ['2.0.1', '2.0.1'],
      ['2.9.9-beta', '2.9.9-beta'],
      ['2.1', '2.1.0'],
      ['2', '2.12'],
      ['2.9', '2.9.1'],
      ['2.9+beta', '2.9+beta'],
      ['2.9.9+beta', '2.9.9+beta'],
      ['2.9.9+beta-alpha', '2.9.9+beta-alpha'],
      ['2.2.3', '2.2.3+beta'],
    ];

		versions.forEach(([targetVersion, userVersion]) => {
			const result = semanticVersion.compareVersion(targetVersion, userVersion);

			expect(result).toBe(0);
		})
  });

  it('should return 1 when user version is greater than target version', () => {
    const versions = [
      ['2.0.0', '2.0.1'],
      ['2.0', '3.0.1'],
      ['2.0.0', '2.1'],
      ['2.1.2-beta', '2.1.2-release'],
      ['2.1.3-beta1', '2.1.3-beta2'],
      ['2.9.9-beta', '2.9.9'],
      ['2.9.9+beta', '2.9.9'],
      ['2.0.0', '2.1'],
      ['3.7.0-prerelease+build', '3.7.0-prerelease+rc'],
      ['2.2.3-beta-beta1', '2.2.3-beta-beta2'],
      ['2.2.3-beta+beta1', '2.2.3-beta+beta2'],
      ['2.2.3+beta2-beta1', '2.2.3+beta3-beta2'],
      ['2.2.3+beta', '2.2.3'],
    ];

		versions.forEach(([targetVersion, userVersion]) => {
			const result = semanticVersion.compareVersion(targetVersion, userVersion);

			expect(result).toBe(1);
		})
  });

  it('should return -1 when user version is less than target version', () => {
    const versions = [
      ['2.0.1', '2.0.0'],
      ['3.0', '2.0.1'],
      ['2.3', '2.0.1'],
      ['2.3.5', '2.3.1'],
      ['2.9.8', '2.9'],
      ['3.1', '3'],
      ['2.1.2-release', '2.1.2-beta'],
      ['2.9.9+beta', '2.9.9-beta'],
      ['3.7.0+build3.7.0-prerelease+build', '3.7.0-prerelease'],
      ['2.1.3-beta-beta2', '2.1.3-beta'],
      ['2.1.3-beta1+beta3', '2.1.3-beta1+beta2'],
      ['2.1.3', '2.1.3-beta'],
    ];
    
		versions.forEach(([targetVersion, userVersion]) => {
			const result = semanticVersion.compareVersion(targetVersion, userVersion);

			expect(result).toBe(-1);
		})
  });

  it('should return null when user version is invalid', () => {
    const versions = [
      '-',
      '.',
      '..',
      '+',
      '+test',
      ' ',
      '2 .3. 0',
      '2.',
      '.2.2',
      '3.7.2.2',
      '3.x',
      ',',
      '+build-prerelease',
      '2..2',
    ];
    const targetVersion = '2.1.0';

		versions.forEach((userVersion) => {
			const result = semanticVersion.compareVersion(targetVersion, userVersion);

			expect(result).toBe(null);
		})
  });
});
