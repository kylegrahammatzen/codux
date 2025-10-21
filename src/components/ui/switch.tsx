import * as React from "react"
import { Switch as BaseSwitch } from "@base-ui-components/react/switch"
import { tv, type VariantProps } from "tailwind-variants"

const switchVariants = tv({
	slots: {
		root: "peer data-[checked]:bg-primary focus-visible:border-ring focus-visible:ring-ring/50 data-[unchecked]:bg-input data-[unchecked]:hover:border-ring/70 data-[checked]:border-primary inline-flex shrink-0 items-center rounded-full border shadow-xs transition-[color,box-shadow,border-color] outline-none focus-visible:ring-[3px] cursor-pointer disabled:cursor-default disabled:pointer-events-none disabled:opacity-50",
		thumb: "bg-background data-[checked]:bg-background pointer-events-none flex items-center justify-center rounded-full ring-0 transition-transform duration-200 ease-in-out"
	},
	variants: {
		size: {
			default: {
				root: "h-5 w-8",
				thumb: "size-4 data-[checked]:translate-x-[calc(100%-3px)] data-[unchecked]:translate-x-px"
			},
			lg: {
				root: "h-6 w-11",
				thumb: "size-5 data-[checked]:translate-x-[calc(100%-1px)] data-[unchecked]:translate-x-1"
			}
		}
	},
	defaultVariants: {
		size: "default"
	}
})

type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root> &
	VariantProps<typeof switchVariants> & {
	icon?: React.ReactNode
}

function Switch({
	className,
	icon,
	size,
	...props
}: SwitchProps) {
	const { root, thumb } = switchVariants({ size })

	return (
		<BaseSwitch.Root
			data-slot="switch"
			className={root({ className })}
			{...props}
		>
			<BaseSwitch.Thumb
				data-slot="switch-thumb"
				className={thumb()}
			>
				{icon}
			</BaseSwitch.Thumb>
		</BaseSwitch.Root>
	)
}

export { Switch }
