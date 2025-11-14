

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div >
            <div className="pt-[70px]">
                {children}
            </div>
        </div>
    )
}