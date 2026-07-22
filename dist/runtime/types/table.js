export var FilterFieldType = /* @__PURE__ */ ((FilterFieldType2) => {
  FilterFieldType2["Boolean"] = "boolean";
  FilterFieldType2["Number"] = "number";
  FilterFieldType2["Enum"] = "enum";
  FilterFieldType2["Select"] = "select";
  return FilterFieldType2;
})(FilterFieldType || {});
export var FilteringMode = /* @__PURE__ */ ((FilteringMode2) => {
  FilteringMode2["Intersect"] = "AND";
  FilteringMode2["Union"] = "OR";
  return FilteringMode2;
})(FilteringMode || {});
export var FilteringFieldOperator = /* @__PURE__ */ ((FilteringFieldOperator2) => {
  FilteringFieldOperator2["In"] = "in";
  FilteringFieldOperator2["NotIn"] = "notIn";
  FilteringFieldOperator2["Equals"] = "equals";
  FilteringFieldOperator2["NotEquals"] = "not";
  FilteringFieldOperator2["LessThan"] = "lt";
  FilteringFieldOperator2["LessThanOrEqual"] = "lte";
  FilteringFieldOperator2["GreaterThan"] = "gt";
  FilteringFieldOperator2["GreaterThanOrEqual"] = "gte";
  return FilteringFieldOperator2;
})(FilteringFieldOperator || {});
