export function evaluateCondition(
    actual: number,
    operator: string,
    expected: number
) {
    switch (operator) {
        case ">":
            return actual > expected;
        case "<":
            return actual < expected;
        case ">=":
            return actual >= expected;
        case "<=":
            return actual <= expected;
        case "==":
            return actual === expected;
        default:
            return false;
    }
}