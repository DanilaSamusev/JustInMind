using JustInMindApp;

using System;
using System.Collections.Generic;
using System.Linq;
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
    /// Логика взаимодействия для UsersView.xaml
    /// </summary>
    public partial class UsersView : Page
    {
        public UsersView()
        {
            InitializeComponent();

            var context = new JustInMindContext();

            var usersList = context.Users;

            var text = "";

            foreach(var user in usersList)
            {
                text += $"Id: {user.Id}, Name {user.UserName},  RoleId: {user.RoleId}\n";
            }

            users.Text = text;
        }
    }
}
