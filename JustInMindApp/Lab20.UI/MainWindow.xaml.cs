using JustInMindApp;
using JustInMindApp.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        JustInMindContext justInMindContext = new JustInMindContext();

        public MainWindow()
        {
            InitializeComponent();
        }

        public void AddUserButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationWindow win = new NavigationWindow();
            win.Content = new AddUserPage();
            win.Show();
        }

        public void DeleteUserButton_Click(object sender, RoutedEventArgs e)
        {
            var user = new User()
            {
                Id = int.Parse(UserId.Text)
            };

            justInMindContext.Users.Attach(user);
            justInMindContext.Users.Remove(user);

            justInMindContext.SaveChanges();
        }

        public void EditUserButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationWindow win = new NavigationWindow();
            win.Content = new EditUserPage();
            win.Show();
        }

        public void AddTaskButton_Click(object sender, RoutedEventArgs e)
        {

        }

        public void DeleteTaskButton_Click(object sender, RoutedEventArgs e)
        {

        }

        public void EditTaskButton_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}
