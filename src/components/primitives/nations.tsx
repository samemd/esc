import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";
import { FormControl } from "~/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { NationOptions } from "~/lib/constants";
import { cn } from "~/lib/utils";

type NationsProps = {
	value?: string;
	onChange: (value: string) => void;
	excludedCountries?: (string | undefined)[];
};

export function NationsAutoComplete({
	value,
	onChange,
	excludedCountries = [],
}: NationsProps) {
	const [open, setOpen] = useState(false);

	const label = useMemo(() => {
		if (!value) return "Select Country";
		const nation = NationOptions.find((nation) => nation.name === value);
		if (!nation) return "Select Country";

		return `${nation.flag} ${nation.name}`;
	}, [value]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant="outline"
						// biome-ignore lint/a11y/useSemanticElements: <explanation>
						role="combobox"
						aria-expanded={open}
						className={cn("justify-between", !value && "text-muted-foreground")}
					>
						{label}
						<ChevronsUpDown className="opacity-50" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder="Search Country..." className="h-9" />
					<CommandList>
						<CommandEmpty>No Country found.</CommandEmpty>
						<CommandGroup>
							{NationOptions.filter(
								(n) => !excludedCountries?.includes(n.name),
							).map((nation) => (
								<CommandItem
									value={nation.name}
									key={nation.code}
									onSelect={() => {
										onChange(nation.name);
										setOpen(false);
									}}
								>
									{nation.flag} {nation.name}
									<Check
										className={cn(
											"ml-auto",
											nation.name === value ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
