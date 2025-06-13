
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ActivityTile } from "@/components/ActivityTile";
import { ArrowLeft, FileText, Settings, Users, BarChart3, FolderOpen, BookOpen, Calendar, ChartPie } from "lucide-react";

const roleActivities = {
  "report-creator": {
    title: "Report Creator",
    activities: [
      {
        icon: FileText,
        title: "Create New Report",
        description: "Start designing a new report template from scratch",
        action: () => console.log("Navigate to report creation")
      },
      {
        icon: Settings,
        title: "Manage Templates",
        description: "Edit and update existing report templates",
        action: () => console.log("Navigate to template management")
      },
      {
        icon: BookOpen,
        title: "Template Library",
        description: "Browse and duplicate existing templates",
        action: () => console.log("Navigate to template library")
      },
      {
        icon: FolderOpen,
        title: "My Drafts",
        description: "Continue working on draft reports",
        action: () => console.log("Navigate to drafts")
      }
    ]
  },
  "data-manager": {
    title: "Data Manager",
    activities: [
      {
        icon: FolderOpen,
        title: "Data Sources",
        description: "Manage and configure data connections",
        action: () => console.log("Navigate to data sources")
      },
      {
        icon: Settings,
        title: "Data Validation",
        description: "Set up data quality rules and checks",
        action: () => console.log("Navigate to data validation")
      },
      {
        icon: Users,
        title: "Access Control",
        description: "Manage user permissions and data access",
        action: () => console.log("Navigate to access control")
      },
      {
        icon: BarChart3,
        title: "Data Analytics",
        description: "View data usage and quality metrics",
        action: () => console.log("Navigate to analytics")
      }
    ]
  },
  "report-generator": {
    title: "Report Generator",
    activities: [
      {
        icon: ChartPie,
        title: "Generate Reports",
        description: "Create reports from existing templates",
        action: () => console.log("Navigate to report generation")
      },
      {
        icon: Calendar,
        title: "Scheduled Reports",
        description: "View and manage automated report runs",
        action: () => console.log("Navigate to scheduled reports")
      },
      {
        icon: FolderOpen,
        title: "Report History",
        description: "Access previously generated reports",
        action: () => console.log("Navigate to report history")
      },
      {
        icon: BarChart3,
        title: "Quick Analytics",
        description: "Generate quick insights and summaries",
        action: () => console.log("Navigate to quick analytics")
      }
    ]
  },
  "report-validator": {
    title: "Report Validator",
    activities: [
      {
        icon: FileText,
        title: "Review Queue",
        description: "Validate pending reports awaiting approval",
        action: () => console.log("Navigate to review queue")
      },
      {
        icon: Settings,
        title: "Validation Rules",
        description: "Configure validation criteria and workflows",
        action: () => console.log("Navigate to validation rules")
      },
      {
        icon: BarChart3,
        title: "Validation Metrics",
        description: "View validation statistics and trends",
        action: () => console.log("Navigate to validation metrics")
      },
      {
        icon: Users,
        title: "Reviewer Assignment",
        description: "Assign reports to validation team members",
        action: () => console.log("Navigate to reviewer assignment")
      }
    ]
  }
};

export default function RoleActivities() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  
  const role = roleId ? roleActivities[roleId as keyof typeof roleActivities] : null;

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Role not found</h1>
          <Button onClick={() => navigate("/")}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Journey Selection
          </Button>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {role.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose an activity to get started
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {role.activities.map((activity, index) => (
            <ActivityTile
              key={index}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              onClick={activity.action}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
