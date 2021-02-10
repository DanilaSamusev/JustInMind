using JustInMindApp;
using JustInMindApp.Models;

using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Lab20.UI
{
    /// <summary>
    /// Interaction logic for AddUserPage.xaml
    /// </summary>
    public partial class AddUserPage : Page
    {
        JustInMindContext justInMindContext = new JustInMindContext();

        public AddUserPage()
        {
            InitializeComponent();
        }

        private void Login_Click(object sender, RoutedEventArgs e)
        {
            User user = new User() 
            {
                UserName = Name.Text,
                Password = this.Password.Password,
                RoleId = int.Parse(RoleId.Text)
            };

            user = justInMindContext.Users.Add(user).Entity;
            justInMindContext.SaveChanges();
        }

        
    }
}
