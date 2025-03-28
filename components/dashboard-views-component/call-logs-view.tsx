"use client"

import { useState } from "react"
import { DataTable } from "@/components/dashboard-ui-component/data-table"
import { EmptyState } from "@/components/dashboard-ui-component/empty-state"
import { Button } from "@/components/dashboard-ui-component/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/dashboard-ui-component/dialog"
import { ClipboardList, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard-ui-component/tabs"

interface CallLog {
  id: string
  phoneNumber: string
  direction: "inbound" | "outbound"
  agent: string
  timestamp: string
  duration: string
  status: "completed" | "failed" | "no-answer"
}

export default function CallLogsView() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([])
  const [isViewLogOpen, setIsViewLogOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<CallLog | null>(null)

  // Sample data for demonstration
  const sampleCallLogs: CallLog[] = [
    {
      id: "1",
      phoneNumber: "+1 (555) 123-4567",
      direction: "outbound",
      agent: "Sales Bot",
      timestamp: "2025-03-24 10:15:22",
      duration: "2:45",
      status: "completed",
    },
    {
      id: "2",
      phoneNumber: "+1 (555) 987-6543",
      direction: "inbound",
      agent: "Support Bot",
      timestamp: "2025-03-24 09:30:15",
      duration: "4:12",
      status: "completed",
    },
    {
      id: "3",
      phoneNumber: "+1 (555) 456-7890",
      direction: "outbound",
      agent: "Appointment Bot",
      timestamp: "2025-03-23 15:45:30",
      duration: "0:00",
      status: "no-answer",
    },
  ]

  const viewCallLog = (log: CallLog) => {
    setSelectedLog(log)
    setIsViewLogOpen(true)
  }

  const columns = [
    {
      header: "Phone Number",
      accessorKey: "phoneNumber" as keyof CallLog,
    },
    {
      header: "Direction",
      accessorKey: "direction" as keyof CallLog,
      cell: (log: CallLog) => (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
            log.direction === "inbound"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
          }`}
        >
          {log.direction.charAt(0).toUpperCase() + log.direction.slice(1)}
        </div>
      ),
    },
    {
      header: "Agent",
      accessorKey: "agent" as keyof CallLog,
    },
    {
      header: "Timestamp",
      accessorKey: "timestamp" as keyof CallLog,
    },
    {
      header: "Duration",
      accessorKey: "duration" as keyof CallLog,
    },
    {
      header: "Status",
      accessorKey: "status" as keyof CallLog,
      cell: (log: CallLog) => {
        const statusColors = {
          completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
          failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
          "no-answer": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        }

        return (
          <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${statusColors[log.status]}`}>
            {log.status === "no-answer" ? "No Answer" : log.status.charAt(0).toUpperCase() + log.status.slice(1)}
          </div>
        )
      },
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof CallLog,
      cell: (log: CallLog) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => viewCallLog(log)}>
            View
          </Button>
        </div>
      ),
    },
  ]

  const emptyState = (
    <EmptyState
      icon={<ClipboardList className="h-12 w-12" />}
      title="No Call Logs"
      description="You haven't made or received any calls yet. Call logs will appear here once you start using the system."
      actionLabel="Export Logs"
      onAction={() => alert("No logs to export")}
    />
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Call Logs</h1>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Calls</TabsTrigger>
          <TabsTrigger value="inbound">Inbound</TabsTrigger>
          <TabsTrigger value="outbound">Outbound</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <DataTable data={sampleCallLogs} columns={columns} emptyState={emptyState} />
        </TabsContent>
        <TabsContent value="inbound" className="mt-4">
          <DataTable
            data={sampleCallLogs.filter((log) => log.direction === "inbound")}
            columns={columns}
            emptyState={emptyState}
          />
        </TabsContent>
        <TabsContent value="outbound" className="mt-4">
          <DataTable
            data={sampleCallLogs.filter((log) => log.direction === "outbound")}
            columns={columns}
            emptyState={emptyState}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={isViewLogOpen} onOpenChange={setIsViewLogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Log Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p>{selectedLog.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Direction</p>
                  <p>{selectedLog.direction.charAt(0).toUpperCase() + selectedLog.direction.slice(1)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Agent</p>
                  <p>{selectedLog.agent}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</p>
                  <p>{selectedLog.timestamp}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</p>
                  <p>{selectedLog.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                  <p>
                    {selectedLog.status === "no-answer"
                      ? "No Answer"
                      : selectedLog.status.charAt(0).toUpperCase() + selectedLog.status.slice(1)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Call Transcript</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md max-h-60 overflow-y-auto">
                  {selectedLog.status === "completed" ? (
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="bg-primary/10 rounded-full p-2 mr-2">
                          <span className="text-primary font-medium">AI</span>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-[80%]">
                          Hello, this is {selectedLog.agent}. How can I help you today?
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-primary p-3 rounded-lg text-white max-w-[80%]">
                          Hi, I'm interested in learning more about your services.
                        </div>
                      </div>
                      <div className="flex">
                        <div className="bg-primary/10 rounded-full p-2 mr-2">
                          <span className="text-primary font-medium">AI</span>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-[80%]">
                          Great! I'd be happy to tell you about our services. We offer...
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No transcript available for this call.</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewLogOpen(false)}>
              Close
            </Button>
            {selectedLog && selectedLog.status === "completed" && (
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Transcript
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

