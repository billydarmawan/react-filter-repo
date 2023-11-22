import "./App.css";
import {
  StringAdapter,
  useFilter,
  useFilterField,
  useFilterFieldArray,
} from "bildar-react-filter-tech";

import { Button } from "@asphalt-react/button";
import { Input, Textfield, Timefield } from "@asphalt-react/textfield";
import { Checkbox } from "@asphalt-react/checkbox";
import { Field, useDropdown, useStatusList } from "./App-helper";

let renderTimes = 0;
function App() {
  renderTimes++;
  const {
    hasChanges,
    state,
    appliedState,
    registery,
    applyStateToSearchParams,
  } = useFilter({});

  const [query, setQuery] = useFilterField(
    "query",
    new StringAdapter("order_id")
  );
  const [queryValue, setQueryValue] = useFilterField("query_value");
  const [name, setName] = useFilterField("name");
  const [minAmount, setMinAmount] = useFilterField("min_amount");
  const [time, setTime] = useFilterField("time");
  const [promo, setPromo] = useFilterField("promo");
  const { array: statusList, toggle: toggleStatus } =
    useFilterFieldArray("status");
  const {
    array: keywords,
    append: appendKeyword,
    setAt,
    removeAt,
  } = useFilterFieldArray("keywords");

  const items = useDropdown();
  const statusListOptions = useStatusList();

  return (
    <>
      <p>Filter {renderTimes}</p>
      <div className="row gap-wide">
        <div className="col gap-s">
          <Field label="Search">
            <div>
              <select
                disabled={items.length === 0}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              >
                {items.length === 0 ? <option>Loading...</option> : null}
                {items.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <Input
              size="xs"
              type="text"
              value={queryValue}
              onChange={(e) => setQueryValue(e.target.value)}
            />
          </Field>

          <Field label="Name">
            <Input
              size="xs"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>

          <Field label="Keyword">
            {keywords.length > 0 &&
              keywords.map(({ key, value }, index) => {
                return (
                  <div key={index} className="col gap-s">
                    <div>
                      Custom Keyword{" "}
                      <Button nude size="xs" onClick={() => removeAt(index)}>
                        X
                      </Button>
                    </div>
                    <select
                      onChange={(e) =>
                        setAt(index, (s) => ({ ...s, key: e.target.value }))
                      }
                      value={key}
                    >
                      <option value={"clientname"}>Client Name</option>
                      <option value={"merchantname"}>Merchant Name</option>
                      <option value={"productname"}>Product Name</option>
                    </select>
                    <Input
                      size="xs"
                      placeholder="Value"
                      value={value}
                      onChange={(e) =>
                        setAt(index, (s) => ({ ...s, value: e.target.value }))
                      }
                    />
                  </div>
                );
              })}
            <Button
              secondary
              size="xs"
              onClick={() =>
                appendKeyword({
                  key: "clientname",
                  value: "",
                })
              }
            >
              Add Keyword
            </Button>
          </Field>

          <Field label="Status">
            <div className="col gap-s">
              {statusListOptions.length === 0 && <div>Loading...</div>}
              {statusListOptions.length > 0 &&
                statusListOptions.map(({ id, label }) => (
                  <Checkbox
                    key={id}
                    onChange={(e) => toggleStatus(id, e.target.checked)}
                    checked={statusList.includes(id)}
                    label={label}
                  />
                ))}
            </div>
          </Field>

          <Field label="Min Amount">
            <Textfield
              size="xs"
              type="text"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
          </Field>

          <Field label="Time">
            <Timefield value={time} onChange={(e) => setTime(e.target.value)} />
          </Field>

          <Field label={"Use Promo?"}>
            <Checkbox
              checked={promo}
              onChange={(e) => setPromo(e.target.checked)}
            />
          </Field>

          <Button
            disabled={!hasChanges}
            onClick={applyStateToSearchParams}
            size="s"
          >
            Apply
          </Button>
        </div>

        <div className="col">
          <p>Filter state</p>
          <pre>{JSON.stringify(state, null, 2)}</pre>
          <p>Applied state</p>
          <pre>{JSON.stringify(appliedState, null, 2)}</pre>
          <p>Registery</p>
          <pre>{JSON.stringify(Object.keys(registery), null, 2)}</pre>
        </div>
      </div>
    </>
  );
}

export default App;
