import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JobsTable } from "./JobsTable"
import { CreateJobDialog } from "./CreateJobDialog"
import { listJobs } from "@/app/actions/jobs"

export default async function Page() {
  const jobs = await listJobs()
  return <div>
    <Tabs defaultValue="jobs" className="">
      <TabsList>
        <TabsTrigger value="jobs">Jobs</TabsTrigger>
        <TabsTrigger value="applications">Applications</TabsTrigger>
      </TabsList>
      <TabsContent value="jobs" className="w-full flex flex-col gap-4">
        <div>
          <CreateJobDialog>
            <Button>+ Job</Button>
          </CreateJobDialog>
        </div>
        <JobsTable jobs={jobs} />

      </TabsContent>
      <TabsContent value="applications">Change your password here.</TabsContent>
    </Tabs>
  </div>
}


export function JobCard({ name, description }: { name: string, description: string }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="font-semibold">Description:</p>
          {description}
        </div>
      </CardContent>
      <CardFooter>
        <Button>Edit</Button>
      </CardFooter>
    </Card>

  )
}
