import { TabsList, TabsTrigger, Tabs as UITabs } from "@/components/ui/tabs";
import React from "react";

interface TabsProps {
	tabs: string[];
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => (
	<UITabs value={activeTab} onValueChange={setActiveTab}>
		<TabsList>
			{tabs.map((tab) => (
				<TabsTrigger key={tab} value={tab}>
					{tab}
				</TabsTrigger>
			))}
		</TabsList>
	</UITabs>
);

export default Tabs;
