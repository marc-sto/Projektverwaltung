import * as React from 'react';
//import {useState} as React from 'react';
import styles from './Treeview.module.scss';
import type { ITreeviewProps } from './ITreeviewProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as spService from '../../../services/spService';
import { TreeView, ITreeItem, TreeViewSelectionMode } from "@pnp/spfx-controls-react/lib/TreeView";

export default class Treeview extends React.Component<ITreeviewProps, { treeItems: ITreeItem[] }> {
  constructor(props) {
    super(props);
    this.state = {
      treeItems: []
    };
  }

  componentDidMount() {
    console.log("Component did Mount");
    this.loadAndTransformSharePointItems().then(() => {
      console.log("Items loaded");
    }).catch(error => {
      console.error("Error loading items:", error);
    });
  }

  async loadAndTransformSharePointItems() {
    const customerItems = await spService.loadCustomerItems(); // Assuming loadCustomerItems returns a Promise
    const projectItems = await spService.loadProjectItems(); // Assuming loadProjectItems returns a Promise
    const transformedCustomerItems = this.transformSharePointItemsToTreeItems(customerItems, projectItems);
    const combinedItems = [...transformedCustomerItems];
    this.setState({ treeItems: combinedItems });
  }

  public transformSharePointItemsToTreeItems(customerItems: any[], projectItems: any[]): ITreeItem[] {
    // Create a map of projectItems by their customerId
    const projectItemsByCustomerId = projectItems.reduce((acc, projectItem) => {
      const customerId = projectItem.customerId; // Assuming projectItems have a CustomerId field
      if (!acc[customerId]) {
        acc[customerId] = [];
      }
      acc[customerId].push({
        key: projectItem.Id.toString(),
        label: projectItem.Title,
      });
      return acc;
    }, {});
  
    // Transform customerItems into treeItems, including their corresponding projectItems as children
    return customerItems.map(customerItem => {
      const treeItem: ITreeItem = {
        key: customerItem.Id.toString(),
        label: customerItem.Title,
        children: projectItemsByCustomerId[customerItem.Id] || [],
      };
      return treeItem;
    });
  }

  public render(): React.ReactElement<ITreeviewProps> {
    const { treeItems } = this.state;
    const {
    } = this.props;

    return (
      <section className={`${styles.treeview}`}>
        <h1>Baumansicht:</h1>
        <TreeView 
          items={treeItems}
          defaultExpanded={false}
        />
      </section>
    );
  }
}
