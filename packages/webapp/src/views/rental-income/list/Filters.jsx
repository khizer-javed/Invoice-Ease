import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import _ from "lodash";
import classNames from "classnames";
import AsyncSelect from "react-select/async";
import { searchLabel } from "@/services/label";
import { FormContainer, Select } from "@/components/ui";
import { FORM_LAYOUT } from "@/constants/app.constant";

const Filters = (props) => {
	const { getTableData } = props;

	const { control, setValue } = useForm({
		defaultValues: {
			labelId: null,
		},
	});

	const { selectedCompany } = useSelector((state) => state.meta);

	const onSearchLabel = async (search, callback) => {
		if (search && search.length > 2) {
			const options = { search };
			options.companyId = selectedCompany;
			const response = await searchLabel(options);
			const data = _.map(response.data, (res) => ({
				value: res.id,
				label: res.label,
			}));
			callback(data);
		}
	};

	const handleChange = (labelId) => {
		setValue("labelId", labelId);
		const options = {};
		options.labelId = labelId?.value;
		getTableData(undefined, undefined, options);
	};

	return (
		<FormContainer
			className={classNames("grid gap-2 mt-2 items-center", ...FORM_LAYOUT)}
		>
			<Controller
				control={control}
				name="labelId"
				render={({ field }) => (
					<Select
						{...field}
						isClearable
						cacheOptions
						defaultOptions
						placeholder="Search Label"
						onChange={handleChange}
						componentAs={AsyncSelect}
						loadOptions={onSearchLabel}
					/>
				)}
			/>
		</FormContainer>
	);
};

export default Filters;
