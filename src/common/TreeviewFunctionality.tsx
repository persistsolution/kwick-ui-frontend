import { TreeView } from "@mui/x-tree-view";
// icons
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export function BasicTreeviewexample1() {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<RemoveCircleOutlineIcon />}
      defaultExpandIcon={<AddCircleOutlineIcon />}
    >
      <TreeItem nodeId="1" label="TECH">
        <TreeItem nodeId="2" label="Company Maintenance" />
        <TreeItem nodeId="3" label="Employees" />
        <TreeItem nodeId="4" label="Human Resources" />
      </TreeItem>
    </TreeView>
  );
}
export function BasicTreeviewexample2() {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<RemoveCircleOutlineIcon />}
      defaultExpandIcon={<AddCircleOutlineIcon />}
    >
      <TreeItem nodeId="5" label="XRP">
        <TreeItem nodeId="6" label="Company Maintenance" />
        <TreeItem nodeId="7" label="Employees">
          <TreeItem nodeId="8" label="Company Maintenance-1" />
        </TreeItem>
        <TreeItem nodeId="10" label="Employees-1">
          <TreeItem nodeId="11" label="Company Maintenance-2" />
        </TreeItem>
        <TreeItem nodeId="12" label="Employees" />
      </TreeItem>
    </TreeView>
  );
}

export function BasicTreeviewexample3() {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<RemoveCircleOutlineIcon />}
      defaultExpandIcon={<AddCircleOutlineIcon />}
    >
      <TreeItem nodeId="5" label="TECH 2">
        <TreeItem nodeId="6" label="Company Maintenance" />
        <TreeItem nodeId="7" label="Employees">
          <TreeItem nodeId="8" label="Company Maintenance" />
          <TreeItem nodeId="10" label="Employees">
            <TreeItem nodeId="11" label="Human Resource" />
          </TreeItem>
        </TreeItem>
        <TreeItem nodeId="12" label="Human Resource" />
      </TreeItem>
    </TreeView>
  );
}

export function BasicTreeviewexample4() {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<RemoveCircleOutlineIcon />}
      defaultExpandIcon={<AddCircleOutlineIcon />}
    >
      <TreeItem nodeId="5" label="TECH 3"></TreeItem>
    </TreeView>
  );
}
