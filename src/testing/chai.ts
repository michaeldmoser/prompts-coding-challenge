import chai, { Assertion, expect, util } from "chai";

import chaiDom from "chai-dom";
import chaiString from "chai-string";
import spies from "chai-spies";

chai.use(chaiDom);
chai.use(spies);
chai.use(chaiString);
chai.should(); // add should() chainable to objects

chai.Assertion.addProperty("disabled", function () {
  const obj = chai.util.flag(this, "object");

  this.assert(
    !!obj.attributes?.disabled,
    "expected " + obj?.toString() + " to have an attribute #{exp}",
    "expected " + obj?.toString() + " not to have an attribute #{exp}",
    "disabled",
  );
});

chai.Assertion.addProperty("required", function () {
  const obj = chai.util.flag(this, "object");

  const hasRequired = obj.attributes?.required ||
    obj.attributes?.["aria-required"];

  this.assert(
    hasRequired,
    "expected " + obj?.toString() + " to have an attribute #{exp}",
    "expected " + obj?.toString() + " not to have an attribute #{exp}",
    "required",
  );
});

util.addProperty(Assertion.prototype, "called", function () {
  // @ts-ignore
  this.assert(
    // @ts-ignore
    this._obj.mock.calls.length > 0,
    "expected #{this} to have been called",
    "expected #{this} to not have been called",
  );
});

export { chai, expect };
