import React from "react";
import { useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { Experiment } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import { getExpRunCount } from "../../utils";
import CustomCard from "../CustomCard";
import { useStyles } from "./styles";
interface ChartProps {
	experiments: Experiment[];
	match: any;
}

const getIconUrl = (chartMetadataName: string, chartGroup: string) => {
	let baseURL: string = "";
	if (
		process.env.NODE_ENV.trim() === "development" ||
		process.env.NODE_ENV.trim() === "test"
	) {
		baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
	} else baseURL = "/api";
	return baseURL + "/icon/" + chartGroup + "/" + chartMetadataName + ".png";
};

export function Charts(props: ChartProps) {
	const { experiments, match } = props;
	const classes = useStyles();
	const analyticsData = useSelector(
		(state: RootState) => state.analyticsData
	);

	return (
		<div className={classes.root}>
			{experiments &&
				experiments.map((e: Experiment) => (
					<CustomCard
						key={e.metadataName}
						id={e.metadataName}
						title={e.name}
						urlToIcon={getIconUrl(
							e.metadataName,
							match.params.chartGroupId
						)}
						handleClick={() =>
							history.push(`${match.url}/${e.metadataName}`)
						}
						provider={e.provider}
						totalRuns={getExpRunCount(
							e,
							analyticsData.expAnalytics
						)}
						chaosType={e.chaosType}
						chartType={match.params.chartGroupId}
					/>
				))}
		</div>
	);
}
