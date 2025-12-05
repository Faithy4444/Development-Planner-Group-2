// dateUtilsTest.js
import { isOneWeekBefore } from './dateUtils.js';

const goalDate1 = '2025-12-09';
const goalDate2 = '2025-12-10';

// Test 1
console.log('Test 1 (should be true):', isOneWeekBefore(goalDate1));

// Test 2
console.log('Test 2 (should be false):', isOneWeekBefore(goalDate2));
